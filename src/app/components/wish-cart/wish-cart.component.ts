import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { WishHttpService } from 'src/app/services/wish-http.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-wish-cart',
  templateUrl: './wish-cart.component.html',
  styleUrls: ['./wish-cart.component.css']
})
export class WishCartComponent implements OnInit {

  wishProducts: {
    wishProduct: Product,
  }[] = [];
  wishTotalPrice: number = 0;
  wishCartCounter!: number;
  wishCartProducts: Product[] = [];

  constructor(private productService: ProductService, private productComp: ProductCardComponent, private router: Router, private wishServ: WishHttpService, public navComp: NavbarComponent) { }

  ngOnInit(): void {
    this.startingCartAmount();

  }

  resetDisplay(): void {
    this.wishServ.getwishListByUserId().subscribe(
      (wishCart) => {
        this.wishCartProducts = wishCart;
        console.log(wishCart);
      }
    );
  }

  startingCartAmount(): void {
    this.wishServ.getwishListByUserId().subscribe(
      (wishCart) => {
        this.wishCartProducts = wishCart;
        console.log(wishCart);
        this.wishCartProducts.forEach(
          (element) => {
            this.wishTotalPrice += Math.round(element.prodPrice);
          }
        )
      }
    );
  }



  emptyWishCart(): void {
    this.wishServ.wishDeleteAll().subscribe(
      (response) => {
        console.log("delete all");
        // this.wishServ.wishCounter = 0;
      });
    this.router.navigate(['/home']);
  }

  removeWishProduct(product: Product): void {
    this.wishProducts.forEach(
      (element, index) => {
        if (element.wishProduct.prodId === product.prodId) {
          this.wishProducts.splice(index, 1);
        }
      }
    );
    this.wishProducts.splice(this.wishCartProducts.indexOf(product), 1);
    this.wishTotalPrice -= Math.round(product.prodPrice);
    let wishCart = {
      wishCartCount: this.wishProducts.length,
      wishProducts: this.wishProducts,
      wishTotalPrice: this.wishTotalPrice
    };
    this.wishServ.wishDelete(product.prodId).subscribe(
      (response) => {
        console.log("delete wish");

        this.resetDisplay();
      });


  }

  // transfer item from wishcart to cart and update cart counter with the new item added

  addFromWish(index: number): void {


    this.productComp.addToCart(this.wishCartProducts[index]);
    // remove from wish
    this.removeWishProduct(this.wishCartProducts[index]);

    // get cart counter and update it with the new item added

    this.navComp.cartCount = this.productComp.cartCount;
    console.log(this.productComp.cartCount);
    console.log(this.navComp.cartCount);

    //route to cart

    //this.router.navigate(['/cart']);

  }


}
