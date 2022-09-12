import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productId: string = '';
  prodDetail: any;
  wishCartCount!: number;
  wishProducts: {
    wishProduct: Product,
    wishQuantity: number
  }[] = [];
  wishTotalPrice!: number;
  cartCount!: number;
  products: {
    product: Product,
    prodQuantity: number
  }[] = [];
  subscription!: Subscription;
  totalPrice: number = 0;

  constructor(private productsService: ProductService, private param: ActivatedRoute) { }

  ngOnInit(): void {
    this.productId = this.param.snapshot.params['id'];
    this.getProduct(parseInt(this.productId));
    this.subscription = this.productsService.getCart().subscribe(
      (cart) => this.cartCount = cart.cartCount
    );
    this.subscription = this.productsService.getWishCart().subscribe(
      (wish) => this.wishCartCount = wish.wishCartCount
    );
  }

  getProduct(id: number) {
    this.productsService.getSingleProduct(id).subscribe({
      next: (response) => {
        this.prodDetail = response;
      },
      error: (err) => {
        console.log(err);
      },
      complete() {
        console.log("Success Got Product")
      },
    })

  }

  addToWishCart(product: Product): void {

      let newWishProduct = {
        wishProduct: product,
        wishQuantity: 1
      };
      this.wishProducts.push(newWishProduct);
      let wishCart = {
        wishCartCount: this.wishCartCount + 1,
        wishProducts: this.wishProducts,
        wishTotalPrice: this.wishTotalPrice + product.prodPrice
      }
      this.productsService.setWishCart(wishCart);
  }


  addToCart(product: Product): void {
    console.log(this.cartCount);
    let newProduct = {
      product: product,
      prodQuantity: 1
    };
    this.products.push(newProduct);
    let cart = {
      cartCount: this.cartCount += 1,
      products: this.products,
      totalPrice: this.totalPrice + product.prodPrice
    }
    this.productsService.setCart(cart);
  }
}
