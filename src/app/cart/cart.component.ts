import { Component, OnInit } from '@angular/core';
import { CartItem } from '../app.cartItem';
import { Product } from '../app.product';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems: CartItem[] = [];

  total = 0;
  
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.getCartItems();
  }

  getCartItems(): void{
    this.cartItems = this.cartService.cartItems;
    this.getTotalPrice(this.cartItems);
  }

  clearAllItems(): void {
    this.cartService.clear();
    this.getCartItems();
  }

  removeProductFromCart(product: Product): void{
    this.cartService.remove(product);
    this.getCartItems();
  }

  addProductToCart (product: Product){
    this.cartService.add(product);
    this.getCartItems();
  }

  getTotalPrice (items: CartItem[]): void{
    var total = 0;
    items.forEach(item => {
      total = total + (item.product.price * item.quantity) ;
    });

    this.total = total;
  }

}
