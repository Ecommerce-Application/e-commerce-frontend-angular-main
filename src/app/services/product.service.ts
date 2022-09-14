import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productUrl: string = "/prod";
  private wishUrl: string = "/wish";

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


  constructor(private http: HttpClient) { }

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(environment.baseUrl + this.productUrl, { headers: environment.headers, withCredentials: environment.withCredentials });
  }

  public getSingleProduct(prodId: number): Observable<Product> {
    return this.http.get<Product>(environment.baseUrl+'/prod/'+prodId);
  }

  public purchase(products: {prodId:number, prodQuantity:number}[]): Observable<any> {
    let fixed:{prodIdDto:number, prodDtoQuantity:number}[]=[];

    for(let p of products){
      fixed.push({prodIdDto:p.prodId, prodDtoQuantity:p.prodQuantity})
    }

    const payload = JSON.stringify(fixed);
    return this.http.patch<any>(environment.baseUrl + this.productUrl, payload, { headers: environment.headers, withCredentials: environment.withCredentials })
  }

  public finalizepurchase(total:number,products: {prodId:number, prodQuantity:number}[]): Observable<any> {
    let fixed:{productId:number,qty:number}[]=[];

    for(let p of products){
      fixed.push({productId:p.prodId, qty:p.prodQuantity})
    }


    let time = Date.now()
    var light = {userId:1,
    total:total,
    datePlaced:Date.now(),
    orderQuantityBoughts:fixed}

    const payload = JSON.stringify(light);
    //let id=window.sessionStorage.getItem('rolodex-token');
    //environment.headers['rolodex-token']='1'
    environment.headers['rolodex-token']=window.sessionStorage.getItem("token")!
    return this.http.post<any>(environment.baseUrl+'/order', payload, { headers: environment.headers, withCredentials: environment.withCredentials })
  }

  public getQuantity(id: number): number {
    const cart = this._cart.getValue();
    const product = cart.products.find(p => p.product.prodId === id);
    if (product) {
      return product.quantity;
    }
    return 0;
  }


  public searchProduct(value: string, searchBy: string): Observable<Product[]> {
    let setParam = new HttpParams();
    let param;
    if (searchBy === "name") {
      param = setParam.append("nameQuery", value)
    }
    else if (searchBy === "description") {
      param = setParam.append("descQuery", value)
    }
    else if (searchBy === "price") {
      param = setParam.append("priceQuery", value)
    }
    return this.http.get<Product[]>(environment.baseUrl + this.productUrl + "/search",
      { headers: environment.headers, withCredentials: environment.withCredentials, params: param });
  }

  public removeProduct(product: Product): void {
    this.getCart().subscribe(
      (cart) => {
        cart.products.forEach(
          (element, index) => {
            if (element.product.prodId === product.prodId) {
              cart.products.splice(index, 1);
            }
          }
        );
        cart.cartCount -= 1;
        cart.totalPrice -= product.prodPrice;
        this.setCart(cart);
      }
    );
  }




  // public removeWishProduct(product: Product): void {
  //   this.getWishCart().subscribe(
  //     (wishCart) => {
  //       wishCart.wishProducts.forEach(
  //         (element, index) => {
  //           if (element.wishProduct.prodId === product.prodId) {
  //             wishCart.wishProducts.splice(index, 1);
  //           }
  //         }
  //       );
  //       wishCart.wishCartCount -= 1;
  //       wishCart.wishTotalPrice -= product.prodPrice;
  //       this.setWishCart(wishCart);
  //     }
  //   );
  // }


}
