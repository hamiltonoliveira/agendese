import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }


  private initForm(): void {
    this.clienteForm = this.fb.group({
      nome: ['', [Validators.required]],
      cnpj: ['', [Validators.required]],
      cep: ['', Validators.required],
      endereco: ['', Validators.required],
      cidade: ['', Validators.required],
      estado: ['', [Validators.required]],
      telefone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required],Validators.minLength(6)],
      confirmPassword: ['', [Validators.required],Validators.minLength(6)],
    });
  }

// Verifica se um campo é inválido e foi tocado
isInvalidField(field: string): boolean {
  const control = this.clienteForm.get(field);
  return control ? control.invalid && control.touched : false;
}

// criarCliente(): void {
//   const clienteData = this.clienteForm.value;
//   this.firebaseClienteService.create(clienteData)
//     .then(() => console.log('Cliente inserido com sucesso!'))
//     .catch((error) => console.error('Erro ao inserir cliente: ', error));
//  }

  onSubmit(): void {
   if (this.clienteForm.valid) {
      const clienteData = this.clienteForm.value;
      console.log('Dados do cliente:', clienteData);
       // Aqui você pode enviar os dados para o backend ou outra ação
    } else {
      this.clienteForm.markAllAsTouched();
    }
  }
}
