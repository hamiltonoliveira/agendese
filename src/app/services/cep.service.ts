import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Endereco } from './../models/cep.model';

@Injectable({
  providedIn: 'root'
})
export class CepService {
  private baseUrl = 'https://viacep.com.br/ws/';

  constructor(private http: HttpClient) { }

  getEndereco(cep: string): Observable<Endereco> {
    const url = `${this.baseUrl}${cep}/json/`;
    return this.http.get<Endereco>(url);
  }
}
