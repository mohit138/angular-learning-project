import { Component, OnInit } from '@angular/core';
import { PRODUCTS } from '../app.mock-products';
import { Product } from '../app.product';
import { CartService } from '../cart.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {



  products: Product[] = [];
  selectedProduct?: Product;
  selectedFlavour = "original";
  selectedGrind = "fine";
  flavours: string[] = [];
  grinds: string[] = [];


  constructor(private productService: ProductService, private cartService: CartService) { }

  ngOnInit(): void {
    if(this.productService.subsVar==undefined){
      this.productService.subsVar = this.productService.invokeProductOnSearchSelectFunction.subscribe(
        () => {
          this.onSearchSelect();
        }
      );
    }
    this.getFlavours();
    this.getGrinds();
    this.getProducts();
    this.onSearchSelect();
  }

  // after we get products, we do onSelect and onSearchSelect, to get state from service to component.
  getProducts(): void {
    this.productService.getProducts()
      .subscribe((products)=> {
        this.products=products;
        this.onSelect();
        this.onSearchSelect();
      });
  }
  getFlavours(): void {
    this.productService.getFlavours()
      .subscribe(flavours => this.flavours=flavours);
  }
  getGrinds(): void {
    this.productService.getGrinds()
      .subscribe(grinds => this.grinds=grinds);
  }

  onSelect(): void{
    let existFlag = 0;

    this.products.forEach(product => {
      if(product.flavour === this.selectedFlavour && product.grind === this.selectedGrind){
        this.selectedProduct = product;
        this.productService.selectedProduct = product;
        existFlag = 1;
      }
    });

    if(existFlag===0){
      this.selectedProduct = undefined;
      this.productService.selectedProduct = undefined;
    }
  }

  onSearchSelect(): void{
    this.selectedProduct = this.productService.selectedProduct;
    console.log("when updating selected flav and grind, product is ",this.selectedProduct?.name)
    if(this.productService.selectedProduct!=undefined){
      this.selectedFlavour = this.productService.selectedProduct.flavour;
      this.selectedGrind = this.productService.selectedProduct.grind;
    }
  }

  onFlavourSelect(flavour: string): void{
    this.selectedFlavour = flavour;
    this.onSelect();
  }

  onGrindSelect(grind: string): void{
    this.selectedGrind = grind;
    this.onSelect();
  }

  

  // tmpProduct: Product = {
  //   id : 0,
  //   name: "New Coffee",
  //   flavour: "new flavour",
  //   grind: "new grind",
  //   type: "arabiata",
  //   description: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.",
  //   price: 137
  // }

  // postProduct(): void{
  //   this.productService.addProduct(this.tmpProduct)
  //     .subscribe(product => this.products.push(product));
  // }

  addToCart (selectedProduct: Product){
    this.cartService.add(selectedProduct);
  }

}
