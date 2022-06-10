import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactModule } from './contact/contact.module';
import { HomeModule } from './home/home.module';
import { NavbarModule } from './navbar/navbar.module';
import { ProductsModule } from './products/products.module';
import { CartComponent } from './cart/cart.component';
import { importType } from '@angular/compiler/src/output/output_ast';
import { InMemoryDataService } from './in-memory-data.service';
import { ProductSearchModule } from './product-search/product-search.module';
import { AddProductModule } from './add-product/add-product.module';
import { ModifyProductComponent } from './modify-product/modify-product.component';
import { ModifyProductModule } from './modify-product/modify-product.module';
import { FooterModule } from './footer/footer.module';

@NgModule({
  declarations: [
    AppComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavbarModule,
    HomeModule,
    ProductsModule,
    ContactModule,
    ProductSearchModule,
    HttpClientModule,
    AddProductModule,
    ModifyProductModule,
    FooterModule
    // HttpClientInMemoryWebApiModule intercepts http request,
    // so, REMOVE when a real server is ready to recieve request
    // HttpClientInMemoryWebApiModule.forRoot(
    //   InMemoryDataService, { dataEncapsulation: false }
    // )

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
