import { Injectable } from '@angular/core';
import { InitSupaBase } from '../utils/InitSupaBase';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Cliente } from '../models/cliente.model';

import { corsHeaders } from './../../../shared/cors';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  supabaseUrl = InitSupaBase.supabaseUrl;
  supabaseKey =   InitSupaBase.supabaseKey;


  constructor(private http: HttpClient){}

  addClient(clientData: Cliente): Observable<Cliente> {
    const headers = new HttpHeaders({
      ...corsHeaders,
      'Authorization': `apikey ${this.supabaseKey}`,
      'Content-Type': 'application/json'
    });

    console.log({headers})

    return this.http.post<Cliente>(this.supabaseUrl, clientData, { headers });
  }


  }




