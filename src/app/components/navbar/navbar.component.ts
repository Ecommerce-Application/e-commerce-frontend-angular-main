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
    this.subscription = this.wishServ.wishCounterS.subscribe((value) => { this.wishCount= value;});
  }

  ngOnInit(): void {
    this.productService.getCart().subscribe(
      (cart) => {
        this.cartCount = cart.cartCount;
      }
    );
    this.subscription = this.productService.getCart().subscribe(
      (cart) => this.cartCount = cart.cartCount
    );

    this.subscription = this.wishServ.getwishListByUserId().subscribe(
      (wish) => {
        // this.wishCount = wish.length;
        this.wishServ.wishCounter = wish.length;
        this.wishCount = this.wishServ.wishCounter;
        console.log(this.wishCount);
      }
    );
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logout() {
    this.authService.logout().subscribe( () => {console.log('ok'); });
    sessionStorage.clear();
    this.router.navigate(['login']);
  }

}
