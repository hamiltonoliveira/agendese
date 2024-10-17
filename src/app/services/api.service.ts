import { Injectable } from '@angular/core';
import { InitSupaBase } from '../utils/InitSupaBase';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente.model';


@Injectable({
  providedIn: 'root',
})
export class ApiService {
  supabaseUrl = InitSupaBase.supabaseUrl;
  supabaseKey = InitSupaBase.supabaseKey;
  supabase: any;

  constructor(private http: HttpClient) {
  }

  addClient(clientData: Cliente): Observable<Cliente> {
    const headers = new HttpHeaders({
      Authorization: `apikey ${this.supabaseKey}`,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS'
    });

    return this.http.post<Cliente>(this.supabaseUrl,JSON.stringify(clientData),{ headers }
    );
  }

}
