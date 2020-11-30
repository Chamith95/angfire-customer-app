import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { CustomerModel } from '../models/customer.model';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private itemDoc: AngularFirestoreDocument<any>;
  item: Observable<any>;
  constructor(private firestore: AngularFirestore) {

  }

  createCustomer(data: CustomerModel): Promise<CustomerModel> {
    return new Promise<CustomerModel>((resolve, reject) => {
      this.firestore
        .collection('customers')
        .add(data)
        .then(res => { }, err => reject(err));
    });
  }

  updateCustomer(id: string, data: CustomerModel): Promise<CustomerModel> {
    console.log(id);
    console.log(data);
    return new Promise<CustomerModel>((resolve, reject) => {
      this.firestore
        .collection('customers')
        .doc(id).set({...data},{ merge: true })
        .then(res => { }, err => reject(err));
    });
  }

  getCustomers(): any {
    return this.firestore.collection('customers').snapshotChanges().pipe(
      map(changes =>
        changes.map((c: any) =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    );
  }

  getCustomerByid(id: string): any {
    return this.firestore.collection('customers').doc(id).snapshotChanges().pipe(
      map((changes: any) =>
        ({ id: changes.payload.id, ...changes.payload.data() })
      )
    )
  }
  removeCustomer(id: string): any {
    return this.firestore.collection('customers').doc(id).delete();
  }


}
