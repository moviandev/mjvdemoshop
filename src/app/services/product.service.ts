import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import 'rxjs-compat/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product){
    this.db.list('/products').push(product);
  }

  returnAll() {
      // return this.db.list('/products');
      return this.db.list('/products')
        .snapshotChanges()
        .map(changes => { return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  get(productId) {
    return this.db.object('/products/' + productId).valueChanges();
  }

  update(productId, product) {
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId){
    return this.db.object('/products/' + productId).remove();
  }
}
