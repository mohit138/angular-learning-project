import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { ProductSearchComponent } from './product-search.component';
import { ProductsModule } from '../products/products.module';



@NgModule({
  declarations: [
    ProductSearchComponent
  ],
  exports:[
    ProductSearchComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ProductsModule
  ]
})
export class ProductSearchModule { }
