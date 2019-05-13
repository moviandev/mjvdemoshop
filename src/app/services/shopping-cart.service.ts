import { Product } from './../modules/product';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/take';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private bd: AngularFireDatabase) { }

  private create() {
    return  this.bd.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }
  private getCart(cartId: string) {
    return this.bd.object('/shopping-cart/' + cartId);
  }

  private async getCreatedCartId() {

    let cartId = localStorage.getItem('cartId');
    if (cartId) { return cartId; }

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.orderByKey;
  }

  private getItem(cartId, productId) {
    return this.bd.object('/shopping-cart/' + cartId + '/items/' + productId);
  }

async addToCart(product) {
    let cartId = await this.getCreatedCartId();
    let item$ = this.getItem(cartId, product.key);

    item$.snapshotChanges().take(1).subscribe((item: any) => {
        if (!item.payload.exists) {
        item$.set({
          product,
          quantity: 1
        });
      } else {
        item$.update({
          quantity: item.payload.exists().quantity + 1
        });
      }
    });

  }
}
