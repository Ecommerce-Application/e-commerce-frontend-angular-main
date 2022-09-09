import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';
import { WishHttpService } from 'src/app/services/wish-http.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  wishCount!: number;
  cartCount!: number;
  subscription!: Subscription;

  constructor(private authService: AuthService, private router: Router, private productService: ProductService, private wishServ: WishHttpService) { }

  ngOnInit(): void {
    this.subscription = this.productService.getCart().subscribe(
      (cart) => this.cartCount = cart.cartCount
    );
    this.subscription = this.productService.getWishCart().subscribe(
      (wish) => this.wishCount = wish.wishCartCount
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logout() {
    this.authService.logout().subscribe( () => {console.log('ok'); this.router.navigate(['login']); sessionStorage.clear();});
    
  }

}
