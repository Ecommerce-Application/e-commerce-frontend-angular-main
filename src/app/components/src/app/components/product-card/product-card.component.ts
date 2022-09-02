import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit{

  cartCount!: number;
  products: {
    product: Product,
    quantity: number
  }[] = [];
  subscription!: Subscription;
  totalPrice: number = 0;


  wishCartCount!: number;
  wishProducts:{
    wishProduct: Product,
    wishQuantity: number
  } [] = [];
  wishSubscription!: Subscription;
  wishTotalPrice!: number;


  @Input() productInfo!: Product;

  constructor(private productService: ProductService) { }

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
        if(element.product == product){
          ++element.quantity;
          let cart = {
            cartCount: this.cartCount + 1,
            products: this.products,
            totalPrice: this.totalPrice + product.price
          };
          this.productService.setCart(cart);
          inCart=true;
          return;
        };
      }
    );

    if(inCart == false){
      let newProduct = {
        product: product,
        quantity: 1
      };
      this.products.push(newProduct);
      let cart = {
        cartCount: this.cartCount + 1,
        products: this.products,
        totalPrice: this.totalPrice + product.price
      }
      this.productService.setCart(cart);
    }

  }

  // Add product to wishcart
  addToWishCart(product: Product): void {
    let inWishCart = false;

    this.products.forEach(
      (element) => {
        if(element.product == product){
          ++element.quantity;
          let wishCart = {
            wishCartCount: this.wishCartCount + 1,
            wishProducts: this.wishProducts,
            wishTotalPrice: this.wishTotalPrice + product.price
          };
          this.productService.setWishCart(wishCart);
          inWishCart=true;
          return;
        };
      }
    );

    if(inWishCart == false){
      let newWishProduct = {
        wishProduct: product,
        wishQuantity: 1
      };
      this.wishProducts.push(newWishProduct);
      let wishCart = {
        wishCartCount: this.wishCartCount + 1,
        wishProducts: this.wishProducts,
        wishTotalPrice: this.wishTotalPrice + product.price
      }
      this.productService.setWishCart(wishCart);
    }
  }





  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}