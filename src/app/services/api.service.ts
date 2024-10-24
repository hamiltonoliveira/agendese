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

  constructor(private http: HttpClient) {
  }

  addClient(clientData: Cliente): Observable<Cliente> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post<Cliente>(`${this.supabaseUrl}/rest/v1/cliente`, JSON.stringify(clientData), { headers });
  }
}
