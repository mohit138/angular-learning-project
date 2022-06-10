import { Component, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../app.product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {


  product?: Product;

  form?: FormGroup;


  constructor(private productService: ProductService,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: this.formBuilder.control(0),
      name: this.formBuilder.control('',Validators.compose([
        Validators.required,
        Validators.pattern('[\\w\\-\\s\\/]+')
      ])),
      flavour: this.formBuilder.control('',Validators.compose([
        Validators.required,
        Validators.pattern('[\\w\\-\\s\\/]+')
      ])),
      grind: this.formBuilder.control('',Validators.compose([
        Validators.required,
        Validators.pattern('[\\w\\-\\s\\/]+')
      ])),
      type: this.formBuilder.control('',Validators.compose([
        Validators.required,
        Validators.pattern('[\\w\\-\\s\\/]+')
      ])),
      description: this.formBuilder.control('',Validators.compose([
        Validators.required
      ])),
      price: this.formBuilder.control(100,Validators.compose([
        Validators.required
      ]))
    });
  }

  tmpProduct: Product = {
    id : 0,
    name: "New Coffee",
    flavour: "new flavour",
    grind: "new grind",
    type: "arabiata",
    description: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.",
    price: 137
  }


  onSubmit(product: Product){
    this.productService.addProduct(product)
      .subscribe({    
        next: (result) => {
          // Handle result
          // console.log(result)
        },
        error:(error) => {
          // this.errors = error;
          alert("Similar Product already exists. Please modify the product by visiting 'Modify Product' page.");
        },
        complete: () => {
          // 'onCompleted' callback.
          // No errors, route to new page here
          this.router.navigate(['/products']);
          alert("Product Added with following details : \n"+
          `Name - ${product.name}\n`+
          `Flavout - ${product.flavour}\n`+
          `Grind - ${product.grind}\n`+
          `Type - ${product.type}\n`+
          `Description - ${product.description}\n`+
          `Price - ${product.price}`);
        }
        
      });
    
  }

}
