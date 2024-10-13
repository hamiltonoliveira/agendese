import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CriptografiaService {

  private chaveSecreta = '@mudar123*&abtn2024';

  constructor() { }


  criptografar(senha: string): string {
    if (!this.chaveSecreta) {
      throw new Error('Chave secreta não definida.');
    }
    const chaveFormatada = String(this.chaveSecreta);
    const chaveCriptografada = CryptoJS.AES.encrypt(chaveFormatada, chaveFormatada).toString();

    const senhaFormatada = String(senha);
    const senhaCriptografada = CryptoJS.AES.encrypt(senhaFormatada, chaveCriptografada).toString();
    const resultadoConcatenado = `${chaveCriptografada}${senhaCriptografada}`;
    return resultadoConcatenado;
  }
}
