import { Component, Input, OnInit } from '@angular/core';
// import { Http2ServerRequest } from 'http2';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { WishHttpService } from 'src/app/services/wish-http.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  cartCount!: number;
  products: {
    product: Product,
    prodQuantity: number
  }[] = [];
  subscription!: Subscription;
  totalPrice: number = 0;


  wishCartCount!: number;
  wishProducts: {
    wishProduct: Product,
    wishQuantity: number
  }[] = [];
  wishSubscription!: Subscription;
  wishTotalPrice!: number;
  newWishList: Product[] = [];
  prodIdList: number[] = [];
  addId: number = 0;

  errorMessage: string = "";


  @Input() productInfo!: Product;

  constructor(private productService: ProductService, private wishService: WishHttpService) { }

  ngOnInit(): void {
    this.subscription = this.productService.getCart().subscribe(
      (cart) => {
        this.cartCount = cart.cartCount;
        this.products = cart.products;
        this.totalPrice = cart.totalPrice;
      }
    );

    this.wishSubscription = this.productService.getWishCart().subscribe(
      (wishCart) => {
        this.wishCartCount = wishCart.wishCartCount;
        this.wishProducts = wishCart.wishProducts;
        this.wishTotalPrice = wishCart.wishTotalPrice;
      }
    );
  }

  addToCart(product: Product): void {

    let inCart = false;

    this.products.forEach(
      (element) => {
        if (element.product == product) {
          ++element.prodQuantity;
          let cart = {
            cartCount: this.cartCount + 1,
            products: this.products,
            totalPrice: this.totalPrice + product.prodPrice
          };
          this.productService.setCart(cart);
          inCart = true;
          return;
        };
      }
    );

    if (inCart == false) {
      let newProduct = {
        product: product,
        prodQuantity: 1
      };
      this.products.push(newProduct);
      let cart = {
        cartCount: this.cartCount + 1,
        products: this.products,
        totalPrice: this.totalPrice + product.prodPrice
      }
      this.productService.setCart(cart);
    }

  }

  // Add product to wishcart
  addToWishCart(product: Product): void {
    this.wishService.getwishListByUserId().subscribe(
      (wishCart) => {
        this.newWishList = wishCart;
        console.log(wishCart);
      }
    );
    if (!this.newWishList.includes(product)) {
      // let wishCart = {
      //   wishCartCount: this.wishCartCount + 1,
      //   wishProducts: this.wishProducts,
      //   wishTotalPrice: this.wishTotalPrice + product.prodPrice
      // };
      this.wishService.addWish(product.prodId).subscribe(
        {
          next: (response) => {
            console.log(response + "response");
            // this.wishService.wishCounter += 1;
          },
          error: (error) => {
            console.log(error);
            console.log("Item is already in your wish list.");
          },
          complete: () => {
            console.log("Request complete");
          }
        }
      );
      return;
    };

  }

    // if (inWishCart == false) {
    //   let newWishProduct = {
    //     wishProduct: product,
    //     wishQuantity: 1
    //   };
    //   this.wishProducts.push(newWishProduct);
    //   let wishCart = {
    //     wishCartCount: this.wishCartCount + 1,
    //     wishProducts: this.wishProducts,
    //     wishTotalPrice: this.wishTotalPrice + product.prodPrice
    //   }
    //   this.productService.setWishCart(wishCart);
    // }



  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
