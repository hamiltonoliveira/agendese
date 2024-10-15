import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { InitSupaBase } from '../utils/InitSupaBase';
import { Cliente } from '../models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  supabaseUrl = InitSupaBase.supabaseUrl;
  supabaseKey =   InitSupaBase.supabaseKey;
  supabase: SupabaseClient;

  constructor(){
    this.supabase = createClient(this.supabaseUrl, this.supabaseKey);
   }

   async addCliente(cliente: Cliente) {
    try {
      const { data, error } = await this.supabase
        .from('cliente')
        .insert(cliente)
        .select();
      if (error) {
        console.error('Erro ao adicionar cliente:', error);
       } else {
        console.log('Cliente adicionado com sucesso:', data);
      }
    } catch (err) {
      console.error('Ocorreu um erro inesperado:', err);
    }
  }
}
