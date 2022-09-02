import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { DisplayProductsComponent } from './components/display-products/display-products.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
<<<<<<< HEAD
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SearchPageComponent } from './components/search-page/search-page.component';
=======
import { WishCartComponent } from './components/wish-cart/wish-cart.component';
import { CaroselComponent } from './components/carosel/carosel.component';
>>>>>>> 386c18e41936b538a10b85e933b86d21ea4aeb7a

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    ProductCardComponent,
    CartComponent,
    CheckoutComponent,
    DisplayProductsComponent,
<<<<<<< HEAD
    SearchBarComponent,
    SearchPageComponent
=======
    WishCartComponent,
    CaroselComponent
>>>>>>> 386c18e41936b538a10b85e933b86d21ea4aeb7a
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ProductCardComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
