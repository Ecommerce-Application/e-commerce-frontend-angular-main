import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { WishHttpService } from 'src/app/services/wish-http.service';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-wish-cart',
  templateUrl: './wish-cart.component.html',
  styleUrls: ['./wish-cart.component.css']
})
export class WishCartComponent implements OnInit {

  wishProducts: {
    wishProduct: Product,
    wishQuantity: number
  }[] = [];
  wishTotalPrice!: number;
  wishCartProducts: Product[] = [];

  constructor(private productService: ProductService, private productComp: ProductCardComponent, private router: Router, private wishServ: WishHttpService) { }

  ngOnInit(): void {
    this.productService.getWishCart().subscribe(
      (wishCart) => {

        this.wishProducts = wishCart.wishProducts;
        this.wishProducts.forEach(
          (element) => this.wishCartProducts.push(element.wishProduct)
        );
        this.wishTotalPrice = wishCart.wishTotalPrice;
      }
    );
  }

  WishProductNumber() {
    const input = document.getElementById('wishProductNumberID') as HTMLInputElement | null;
    // update total price of wishcart based on user input
    if (input) {
      this.wishTotalPrice = 0;
      this.wishProducts.forEach(
        (element) => {
          this.wishTotalPrice += element.wishProduct.price * element.wishQuantity;
        }
      );
      let wishCart = {
        wishCartCount: this.wishProducts.length,
        wishProducts: this.wishProducts,
        wishTotalPrice: this.wishTotalPrice
      };
      this.productService.setWishCart(wishCart);
    }
  }



  updateWishQuantity(product: Product, quantity: number): void {
    this.wishProducts.forEach(
      (element) => {
        if (element.wishProduct == product) {
          element.wishQuantity = quantity;
        }
      }
    );
    this.wishTotalPrice = 0;
    this.wishProducts.forEach(
      (element) => {
        this.wishTotalPrice += element.wishProduct.price * element.wishQuantity;
      }
    );
    let wishCart = {
      wishCartCount: this.wishProducts.length,
      wishProducts: this.wishProducts,
      wishTotalPrice: this.wishTotalPrice
    };
    this.productService.setWishCart(wishCart);
  }

  emptyWishCart(): void {
    let wishCart = {
      wishCartCount: 0,
      wishProducts: [],
      wishTotalPrice: 0.00
    };
    this.productService.setWishCart(wishCart);
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
    this.wishTotalPrice -= product.price;
    let wishCart = {
      wishCartCount: this.wishProducts.length,
      wishProducts: this.wishProducts,
      wishTotalPrice: this.wishTotalPrice
    };
    this.productService.setWishCart(wishCart);


    this.wishServ.wishDelete(product.prodId).subscribe(book=>{
      // this.getAllWishs();
    })
  }

  


  // trying to add from wishcart to cart

  addFromWish(index : number): void {
  this.productComp.addToCart(this.wishProducts[index].wishProduct);
  }


}
