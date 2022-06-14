import { Component, OnInit } from '@angular/core';
import { CartItem } from '../app.cartItem';
import { Product } from '../app.product';
import { CartService } from '../cart.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems: CartItem[] = [];

  total = 0;
  
  constructor(private cartService: CartService, private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    
    if(this.tokenStorageService.redirectUrl==="/cart"){
      this.tokenStorageService.redirectUrl="";
      window.location.reload();
    }

    this.getCartItems();
    console.log(this.cartItems);
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
