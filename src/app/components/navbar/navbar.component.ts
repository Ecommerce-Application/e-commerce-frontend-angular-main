import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';
import { WishHttpService } from 'src/app/services/wish-http.service';
import { WishCartComponent } from '../wish-cart/wish-cart.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  wishCount!: number;
  cartCount!: number;
  subscription!: Subscription;
  _subscription!: Subscription;
  

  constructor(private authService: AuthService, private router: Router, private productService: ProductService, public wishServ: WishHttpService) { 
    // this.wishCount = this.wishServ.wishCounter;
    this.subscription = this.wishServ.wishCounterS.subscribe((value) => { this.wishCount= value;});
  }

  ngOnInit(): void {
    this.subscription = this.productService.getCart().subscribe(
      (cart) => this.cartCount = cart.cartCount
    );

    this.subscription = this.wishServ.getwishListByUserId().subscribe(
      (wish) => {
        // this.wishCount = wish.length;
        console.log(this.wishCount + "wish count onInit");            
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  // refreshCounter(): number {
  //   console.log("refresh display called");
  //   this.subscription = this.wishServ.getwishListByUserId().subscribe(
  //   (wish) => this.wishCount = wish.length

  // );
    
  //   console.log(this.wishCount);
  //   return this.wishCount;
    
  // }
}
