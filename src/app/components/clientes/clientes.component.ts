import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CepService } from 'src/app/services/cep.service';
import { FirebaseClienteService } from 'src/services/firebase-cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  clienteForm!: FormGroup;
  setores = [
    { id: 1, nome: 'Comercial' },
    { id: 2, nome: 'Financeiro' },
    { id: 3, nome: 'Recursos Humanos' },
    { id: 4, nome: 'Tecnologia' }
  ];

  constructor(private fb: FormBuilder, private Cep: CepService) {}

  ngOnInit(): void {
    this.initForm();
  }


  private initForm(): void {
    this.clienteForm = this.fb.group({
      nome: ['', [Validators.required]],
      cnpj: ['', [Validators.required]],
      cep: ['', [Validators.required]],
      endereco: ['', [Validators.required]],
      cidade: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      telefone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],},
      { validators: this.senhasIguais });
  }

buscaCep(){
  let buscaCep =  this.clienteForm.get("cep")?.value;
  if(buscaCep != null)
  this.Cep.getEndereco(buscaCep).subscribe(data=>{
    this.clienteForm.patchValue({
      endereco: data.logradouro,
      bairro: data.bairro,
      cidade: data.localidade,
      estado: data.uf
    });
  })
}

senhasIguais(formGroup: FormGroup): { [key: string]: boolean } | null {
  const password = formGroup.get('Password')?.value;
  const confirmPassword = formGroup.get('confirmPassword')?.value;
  return password === confirmPassword ? null : { senhasDiferentes: true };
}

onSubmit(): void {
   if (this.clienteForm.valid) {
    const clienteData = this.clienteForm.value;
    console.log('Dados do cliente:', clienteData);
  } else {
    this.clienteForm.markAllAsTouched();
    }
  }
}

