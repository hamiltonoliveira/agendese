import { Setor } from './setor.model';

export interface Cliente {
  guid?: string;
  nome: string;
  cnpj: string;
  cep: string;
  endereco: string;
  cidade: string;
  estado: string;
  telefone: string;
  email: string;
  ativo: boolean;
  password:string;
}
