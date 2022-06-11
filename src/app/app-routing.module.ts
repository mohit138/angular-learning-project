import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { CartComponent } from './cart/cart.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { ModifyProductComponent } from './modify-product/modify-product.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  { path:"", component:HomeComponent},
  { path:"products", component:ProductsComponent},
  { path:"contact", component:ContactComponent},
  { path:"cart", component:CartComponent},
  { path:"add", component: AddProductComponent},
  { path:"modify", component: ModifyProductComponent},
  { path: '',   redirectTo: '/heroes', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
