import { Setor } from './setor.model';

export interface Cliente {
  id?: number;
  nome: string;
  cnpj: string;
  endereco: string;
  cidade: string;
  estado: string;
  telefone: string;
  email: string;
  setor?: Setor | null;
  dataCadastro: Date;
  ativo: boolean;
}
