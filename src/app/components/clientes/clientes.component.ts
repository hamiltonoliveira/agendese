import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CepService } from 'src/app/services/cep.service';
import { FirebaseClienteService } from 'src/services/firebase-cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
})
export class ClientesComponent implements OnInit {
  clienteForm!: FormGroup;
  setores = [
    { id: 1, nome: 'Comercial' },
    { id: 2, nome: 'Financeiro' },
    { id: 3, nome: 'Recursos Humanos' },
    { id: 4, nome: 'Tecnologia' },
  ];

  constructor(private fb: FormBuilder, private Cep: CepService) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.clienteForm = this.fb.group(
      {
        nome: ['', [Validators.required]],
        cnpj: ['', [Validators.required]],
        cep: ['', [Validators.required]],
        endereco: ['', [Validators.required]],
        cidade: ['', [Validators.required]],
        estado: ['', [Validators.required]],
        telefone: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        Password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
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
    const password = formGroup.get('Password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { senhasDiferentes: true };
  }

  validarCNPJ(): { [key: string]: boolean } | null {
    // 53.355.714/0001-89
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
      console.log('Dados do cliente:', clienteData);
    } else {
      this.clienteForm.markAllAsTouched();
      console.log('Formulário inválido');
    }
  }
}

