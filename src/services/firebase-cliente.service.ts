import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from 'src/app/models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseClienteService {

  private collectionName = 'clientes';

  constructor() { }

  // getAll(): Observable<Cliente[]> {
  //   const collectionRef = collection(this.firestore, this.collectionName);
  //   return collectionData(collectionRef, { idField: 'id' }) as Observable<Cliente[]>; // Faz o cast para o tipo Cliente
  // }

  // getById(id: string): Observable<any> {
  //   const docRef = doc(this.firestore, `${this.collectionName}/${id}`);
  //   return docData(docRef, { idField: 'id' });
  // }

  // create(data: Cliente): Promise<any> {
  //   const collectionRef = collection(this.firestore, this.collectionName);
  //   return addDoc(collectionRef, data);
  // }

  // update(id: string, data: any): Promise<void> {
  //   const docRef = doc(this.firestore, `${this.collectionName}/${id}`);
  //   return updateDoc(docRef, data);
  // }

}
