import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product';
import { environment } from 'src/environments/environment';

interface Cart {
  cartCount: number;
  products: {
    product: Product,
    quantity: number
  }[];
  totalPrice: number;
}

interface WishCart {
  wishCartCount: number;
  wishProducts: {
    wishProduct: Product,
    wishQuantity: number
  }[];
  wishTotalPrice: number;
}


@Injectable({providedIn: 'root'
})
export class ProductService {

  private productUrl: string = "/api/product";

  private _cart = new BehaviorSubject<Cart>({
    cartCount: 0,
    products: [],
    totalPrice: 0.00
  });

  private _cart$ = this._cart.asObservable();

  getCart(): Observable<Cart> {
    return this._cart$;
  }

  setCart(latestValue: Cart) {
    return this._cart.next(latestValue);
  }

  private _wishcart = new BehaviorSubject<WishCart>({
    wishCartCount: 0,
    wishProducts: [],
    wishTotalPrice: 0.00
  });
  private _wishcart$ = this._wishcart.asObservable();

  getWishCart(): Observable<WishCart> {
    return this._wishcart$;
  }

  setWishCart(latestValue: WishCart) {
    return this._wishcart.next(latestValue);
  }

  constructor(private http: HttpClient) { }

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(environment.baseUrl+this.productUrl, {headers: environment.headers, withCredentials: environment.withCredentials});
  }

  public getSingleProduct(id: number): Observable<Product> {
    return this.http.get<Product>(environment.baseUrl+this.productUrl+'/'+id,{headers: environment.headers, withCredentials: environment.withCredentials});
  }

  public purchase(products: {id:number, quantity:number}[]): Observable<any> {
    const payload = JSON.stringify(products);
    return this.http.patch<any>(environment.baseUrl+this.productUrl, payload, {headers: environment.headers, withCredentials: environment.withCredentials})
  }

 public removeProduct(product: Product): void {
    this.getCart().subscribe(
      (cart) => {
        cart.products.forEach(
          (element, index) => {
            if (element.product.id === product.id) {
              cart.products.splice(index, 1);
            }
          }
        );
        cart.cartCount -= 1;
        cart.totalPrice -= product.price;
        this.setCart(cart);
      }
    );
  }

  public removeWishProduct(product: Product): void {
    this.getWishCart().subscribe(
      (wishCart) => {
        wishCart.wishProducts.forEach(
          (element, index) => {
            if (element.wishProduct.id === product.id) {
              wishCart.wishProducts.splice(index, 1);
            }
          }
        );
        wishCart.wishCartCount -= 1;
        wishCart.wishTotalPrice -= product.price;
        this.setWishCart(wishCart);
      }
    );
        }

}
