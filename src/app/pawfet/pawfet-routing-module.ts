import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home-component/home-component';
import { LoginComponent } from './login-component/login-component';
import { SignupComponent } from './signup-component/signup-component';
import { BookDaycare } from './book-daycare/book-daycare';
import { PaymentComponent } from './payment-component/payment-component';
import { CartComponent } from './cart-component/cart-component';
import { ShopComponent } from './shop-component/shop-component';
import { DogProfile } from './dog-profile/dog-profile';
import { Contact } from './contact/contact';
import { Aboutus } from './aboutus/aboutus';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'book-daycare', component: BookDaycare},
  { path: 'payment', component: PaymentComponent},
  { path: 'shop', component: ShopComponent},
  { path: 'cart', component: CartComponent},
  { path: 'dogprofile', component: DogProfile},
    { path: 'contact', component: Contact},
     { path: 'about', component: Aboutus},

  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PawfetRoutingModule { }
