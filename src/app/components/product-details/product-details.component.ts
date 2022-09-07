import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  //wishSubscription!: Subscription;
  wishTotalPrice!: number;

  constructor(private productsService: ProductService, private param: ActivatedRoute) { }

  ngOnInit(): void {
    this.productId = this.param.snapshot.params['id'];
    this.getProduct(parseInt(this.productId));
  }

  cartCount!: number;
  products: {
    product: Product,
    quantity: number
  }[] = [];
  // subscription!: Subscription;
  totalPrice: number = 0;

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

  // addToWishCart(product: Product): void {
  //   let inWishCart = false;

  //       if(this.prodDetail){
  //         ++this.prodDetail.quantity;
  //         let wishCart = {
  //           wishCartCount: this.wishCartCount + 1,
  //           wishProducts: this.wishProducts,
  //           wishTotalPrice: this.wishTotalPrice + product.price
  //         };
  //         this.productsService.setWishCart(wishCart);
  //        // inWishCart=true;
  //         return;
  //       };


  //   if(inWishCart == false){
  //     let newWishProduct = {
  //       wishProduct: product,
  //       wishQuantity: 1
  //     };
  //     this.wishProducts.push(newWishProduct);
  //     let wishCart = {
  //       wishCartCount: this.wishCartCount + 1,
  //       wishProducts: this.wishProducts,
  //       wishTotalPrice: this.wishTotalPrice + product.price
  //     }
  //     this.productsService.setWishCart(wishCart);
  //   }
  // }


  addToCart(product: Product): void {

    // let inCart = false;

    // this.products.forEach(
    //   (element) => {
    //     if(element.product == product){
    //       ++element.quantity;
    //       let cart = {
    //         cartCount: this.cartCount + 1,
    //         products: this.products,
    //         totalPrice: this.totalPrice + product.price
    //       };
    //       this.productsService.setCart(cart);
    //       inCart=true;
    //       return;
    //     };
    //   }
    // );


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
    this.productsService.setCart(cart);
  }
}
