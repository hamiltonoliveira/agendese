import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CriptografiaService {

  private chaveSecreta = '@mudar123*&abtn2024';

  constructor() { }

  criptografar(dados: string): string {
    return CryptoJS.AES.encrypt(dados, this.chaveSecreta).toString();
  }

  descriptografar(dadosCriptografados: string): string {
    const bytes = CryptoJS.AES.decrypt(dadosCriptografados, this.chaveSecreta);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

}
