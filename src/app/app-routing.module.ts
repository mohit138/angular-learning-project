import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { AdminGuard } from './auth/admin.guard';
import { UserGuard } from './auth/user.guard';
import { CartComponent } from './cart/cart.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ModifyProductComponent } from './modify-product/modify-product.component';
import { ProductsComponent } from './products/products.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path:"", component:HomeComponent},
  { path:"products", component:ProductsComponent},
  { path:"contact", component:ContactComponent},
  { path:"cart",canActivate: [UserGuard], component:CartComponent},
  { path:"add", canActivate: [AdminGuard], component: AddProductComponent},
  { path:"modify", canActivate: [AdminGuard], component: ModifyProductComponent},
  { path:"register",  component: RegisterComponent},
  { path:"login", component: LoginComponent},
  { path:"profile", component: ProfileComponent},
  { path: '',   redirectTo: '/heroes', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
