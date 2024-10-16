import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CepService } from 'src/app/services/cep.service';
import { CriptografiaService } from 'src/services/criptografia.service';
import { LocalStorageService } from 'src/services/local-storage.service';

import { ToastrService } from 'ngx-toastr';
import { GuidService } from 'src/services/guid.service';
import { ApiService } from 'src/app/services/api.service';
import { Cliente } from 'src/app/models/cliente.model';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
})
export class ClientesComponent implements OnInit {
  clienteForm!: FormGroup;
  dados: any;

  constructor(private fb: FormBuilder,
              private Cep: CepService,
              private localStorageService:LocalStorageService,
              private cripto:CriptografiaService,
              private toastrService: ToastrService,
              private guidService: GuidService,
              private apiService:ApiService) {}

  ngOnInit(): void {
    this.initForm();
    this.preencherForm();
   }

  private initForm(): void {
    this.clienteForm = this.fb.group(
      {
        guid: [''],
        nome: ['', [Validators.required]],
        cnpj: ['', [Validators.required]],
        cep:  ['', [Validators.required]],
        endereco: ['', [Validators.required]],
        cidade:  ['', [Validators.required]],
        estado:  ['', [Validators.required]],
        telefone:  ['', [Validators.required]],
        email:  ['', [Validators.required, Validators.email]],
        password:  ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword:  ['', [Validators.required, Validators.minLength(6)]]
      },
      { validators: this.senhasIguais }
    );
  }

  buscaCep() {
    let buscaCep = this.clienteForm.get('cep')?.value;
    if (buscaCep != null)
      this.Cep.getEndereco(buscaCep).subscribe((data) => {
        this.clienteForm.patchValue({
          endereco: data.logradouro,
          bairro: data.bairro,
          cidade: data.localidade,
          estado: data.uf,
        });
      });
  }

  senhasIguais(formGroup: FormGroup): { [key: string]: boolean } | null {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { senhasDiferentes: true };
  }

  validarCNPJ(): { [key: string]: boolean } | null {
    const cnpj = this.clienteForm.get('cnpj')?.value;

    if (!cnpj) {
      return null;
    }

    const cleanedCNPJ = cnpj.replace(/[^\d]+/g, '');

    if (cleanedCNPJ.length !== 14) {
      console.log('CNPJ inválido: deve ter 14 dígitos');
      return { cnpjInvalido: true };
    }

    if (/^(\d)\1+$/.test(cleanedCNPJ)) {
      console.log('CNPJ inválido: todos os dígitos são iguais');
      return { cnpjInvalido: true };
    }

    let tamanho = cleanedCNPJ.length - 2;
    let numeros = cleanedCNPJ.substring(0, tamanho);
    let digitos = cleanedCNPJ.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
      soma += +numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) {
        pos = 9;
      }
    }

    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== +digitos.charAt(0)) {
      console.log('CNPJ inválido: primeiro dígito verificador incorreto');
      return { cnpjInvalido: true };
    }

    tamanho = tamanho + 1;
    numeros = cleanedCNPJ.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
      soma += +numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) {
        pos = 9;
      }
    }

    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    const isValid = resultado === +digitos.charAt(1);

    if (!isValid) {
      console.log('CNPJ inválido: segundo dígito verificador incorreto');
    }
    return isValid ? null : { cnpjInvalido: true };
  }

  onSubmit(): void {
    const resultadoCNPJ = this.validarCNPJ();

    if (resultadoCNPJ) {
      this.clienteForm.get('cnpj')?.setErrors(resultadoCNPJ);
    }

    if (this.clienteForm.valid) {
      const clienteData = this.clienteForm.value;
      delete clienteData.confirmPassword;
      clienteData.password = this.cripto.criptografar(clienteData.password);
      clienteData.guid = this.guidService.standard();
      this.localStorageService.setItem('cliente',clienteData)
      this.apiService.addClient(clienteData);
      this.showInfo();
    } else {
      this.clienteForm.markAllAsTouched();
    }
  }

  public showInfo(): void {
    this.toastrService.success('Registro efetuado');
  }

  public showWarning(): void {
    this.toastrService.warning('Message Warning!', 'Title Warning!');
  }

  public showError(): void {
    this.toastrService.error('Preencha todos os dados', 'Formulário');
  }

  preencherForm() {
    this.dados = this.localStorageService.getItem('cliente');
    if (this.dados && Object.keys(this.dados).length > 0) {
      const { nome, cnpj, cep, endereco, cidade, estado, telefone, email } = this.dados;
    this.clienteForm.patchValue({
        nome: nome || '',
        cnpj: cnpj || '',
        cep: cep || '',
        endereco: endereco || '',
        cidade: cidade || '',
        estado: estado || '',
        telefone: telefone || '',
        email: email || '',
        password: '',
        confirmPassword: ''
      });
    }
  }

  enviarDados(dados:Cliente): void {
    this.apiService.addClient(this.dados).subscribe({
      next: (resposta) => {
        console.log('Dados enviados com sucesso:', resposta);
      },
      error: (erro) => {
        console.error('Erro ao enviar dados:', erro);
      }
    });
  }
}


