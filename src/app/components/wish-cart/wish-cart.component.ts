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
        // this.wishServ.wishCounter = wishCart.length;
        // this.wishCartProducts.forEach(
        //   (element) => {
        //     this.wishTotalPrice += element.prodPrice;
        //   }
        // )
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
            this.wishTotalPrice += element.prodPrice;
          }
        )
      }
    );
  }

  // WishProductNumber() {
  //   const input = document.getElementById('wishProductNumberID') as HTMLInputElement | null;
  //   // update total price of wishcart based on user input
  //   if (input) {
  //     this.wishTotalPrice = 0;
  //     this.wishProducts.forEach(
  //       (element) => {
  //         this.wishTotalPrice += element.wishProduct.price * element.wishQuantity;
  //       }
  //     );
  //     let wishCart = {
  //       wishCartCount: this.wishProducts.length,
  //       wishProducts: this.wishProducts,
  //       wishTotalPrice: this.wishTotalPrice
  //     };
  //     this.productService.setWishCart(wishCart);
  //   }
  // }



  // updateWishQuantity(product: Product, quantity: number): void {
  //   this.wishProducts.forEach(
  //     (element) => {
  //       if (element.wishProduct == product) {
  //         element.wishQuantity = quantity;
  //       }
  //     }
  //   );
  //   this.wishTotalPrice = 0;
  //   this.wishProducts.forEach(
  //     (element) => {
  //       this.wishTotalPrice += element.wishProduct.price * element.wishQuantity;
  //     }
  //   );
  //   let wishCart = {
  //     wishCartCount: this.wishProducts.length,
  //     wishProducts: this.wishProducts,
  //     wishTotalPrice: this.wishTotalPrice
  //   };
  //   this.productService.setWishCart(wishCart);
  // }

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
    this.wishTotalPrice -= product.prodPrice;
    let wishCart = {
      wishCartCount: this.wishProducts.length,
      wishProducts: this.wishProducts,
      wishTotalPrice: this.wishTotalPrice
    };
    this.wishServ.wishDelete(product.prodId).subscribe(
      (response) => {
        console.log("delete wish");
        // this.navComp.refreshCounter();
        // this.wishServ.wishCounter -= 1;
        this.resetDisplay();
      });
    
    // this.wishServ.setWishCart(wishCart);

  }




  // trying to add from wishcart to cart

  addFromWish(index: number): void {
    this.productComp.addToCart(this.wishProducts[index].wishProduct);
  }


}
