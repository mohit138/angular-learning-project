import { Injectable } from '@angular/core';
import { CartItem } from './app.cartItem';
import { Product } from './app.product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];

  constructor() { }

  add(product: Product){
    var existingFlag = 0;
    var quantity: number= 1;
    this.cartItems.forEach(item => {
      console.log(item.product.name, product.name);
      if(JSON.stringify(item.product) === JSON.stringify(product)){
        item.quantity++;
        existingFlag = 1;
      }
    });
    if(existingFlag === 0){
      this.cartItems.push({product,quantity});
    }
  }

  remove(product: Product){
    var existingFlag = 0;
    this.cartItems.forEach((item,index) => {
      if(item.product === product){
        if(item.quantity === 1){
          delete this.cartItems[index];
        }else{
          item.quantity--;
        }
      }
    });
  }

  clear() {
    this.cartItems = [];
  }

}
