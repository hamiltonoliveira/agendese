import { Setor } from './setor.model';

export interface Cliente {
  id?: number;
  nome: string;
  cnpj: string;
  cep: string;
  endereco: string;
  cidade: string;
  estado: string;
  telefone: string;
  email: string;
  setor?: Setor | null;
  dataCadastro: Date;
  ativo: boolean;
  Password:string;
  confirmPassword:string;
}
