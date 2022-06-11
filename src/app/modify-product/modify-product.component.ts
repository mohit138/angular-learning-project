import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../app.product';
import { ProductService } from '../product.service';


@Component({
  selector: 'app-modify-product',
  templateUrl: './modify-product.component.html',
  styleUrls: ['./modify-product.component.css']
})
export class ModifyProductComponent implements OnInit {

  products: Product[] = [];

  productToModify?:Product;
  form?: FormGroup;

  offsetY = window.screen.height / 6
  scrollY = this.offsetY;

  loading = true;

  constructor(private productService: ProductService, private router:Router,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.getProducts();

    // this.form = this.formBuilder.group({
    //   id: this.formBuilder.control(0),
    //   name: this.formBuilder.control('',Validators.compose([
    //     Validators.required,
    //     Validators.pattern('[\\w\\-\\s\\/]+')
    //   ])),
    //   flavour: this.formBuilder.control('',Validators.compose([
    //     Validators.required,
    //     Validators.pattern('[\\w\\-\\s\\/]+')
    //   ])),
    //   grind: this.formBuilder.control('',Validators.compose([
    //     Validators.required,
    //     Validators.pattern('[\\w\\-\\s\\/]+')
    //   ])),
    //   type: this.formBuilder.control('',Validators.compose([
    //     Validators.required,
    //     Validators.pattern('[\\w\\-\\s\\/]+')
    //   ])),
    //   description: this.formBuilder.control('',Validators.compose([
    //     Validators.required
    //   ])),
    //   price: this.formBuilder.control('',Validators.compose([
    //     Validators.required
    //   ]))
    // });
  }

  @HostListener("window:scroll", [])
  onWindowScroll() {

    const number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    
    if(Math.abs(this.scrollY - (number+this.offsetY)) >20){
      this.scrollY = number+this.offsetY;
    }
    

  }

  getProducts():void {
    this.productService.getProducts()
    .subscribe({    
      next: (products) => {
        this.products=products;
      },
      error:(error) => {
        // this.errors = error;
      },
      complete: () => {
        // 'onCompleted' callback.
        // No errors, route to new page here
        this.loading = false;
      }
    });
  }

  deleteProduct(product: Product):void {
    this.productService.deleteProduct(product.id)
      .subscribe(()=>{
        console.log('deleted the product with id ',product.id);
        this.getProducts();
      });
  }
  
  updateProduct(product: Product): void{
    this.productService.updateProduct(product)
      .subscribe(() => {
        console.log("updates the product with id ",product.id);
        this.getProducts();
        this.productToModify = undefined;
      })
  }

  modify(product: Product): void {
    this.productToModify = product;
    this.form = this.formBuilder.group({
      id: this.formBuilder.control(product.id),
      name: this.formBuilder.control(product.name,Validators.compose([
        Validators.required,
        Validators.pattern('[\\w\\-\\s\\/]+')
      ])),
      flavour: this.formBuilder.control(product.flavour,Validators.compose([
        Validators.required,
        Validators.pattern('[\\w\\-\\s\\/]+')
      ])),
      grind: this.formBuilder.control(product.grind,Validators.compose([
        Validators.required,
        Validators.pattern('[\\w\\-\\s\\/]+')
      ])),
      type: this.formBuilder.control(product.type,Validators.compose([
        Validators.required,
        Validators.pattern('[\\w\\-\\s\\/]+')
      ])),
      description: this.formBuilder.control(product.description,Validators.compose([
        Validators.required
      ])),
      price: this.formBuilder.control(product.price,Validators.compose([
        Validators.required
      ]))
    });
  }

  cancelModify():void{
    this.productToModify = undefined;
  }

}
