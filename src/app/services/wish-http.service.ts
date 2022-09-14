import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';
import { Wish } from '../models/wish';

interface WishCart {
  wishCartCount: number;
  wishCartProducts: Product[];
  wishTotalPrice: number;
}


@Injectable({
  providedIn: 'root'
})
export class WishHttpService {
  private wishUrl: string = "/wish";

  // private _wishcart = new BehaviorSubject<WishCart>({
  //   wishCartCount: 0,
  //   wishCartProducts: [],
  //   wishTotalPrice: 0.00
  // });
  // private _wishcart$ = this._wishcart.asObservable();

  // getWishCart(): Observable<WishCart> {
  //   return this._wishcart$;
  // }

  // setWishCart(latestValue: WishCart) {
  //   return this._wishcart.next(latestValue);
  // }  

  sessiontoken = sessionStorage.getItem('token');
  uId = sessionStorage.getItem('userId');

  httpOptions = {
    headers: new HttpHeaders({'Content-Type' : 'application/json', 
                            'rolodex-token': `${this.sessiontoken}`})
  }

  constructor(private http: HttpClient) { }

  public getwishListByUserId(): Observable<Product[]> {
    return this.http.get<Product[]>(environment.baseUrl+this.wishUrl+"/get/"+this.uId, this.httpOptions);
  }

  addWish(pId:number): Observable<Wish>{
    console.log(Number(this.uId));
    console.log(pId);
    return this.http.post<Wish>(`${environment.baseUrl}${this.wishUrl}/post/${Number(this.uId)}/${pId}`, this.httpOptions);
  }
   
  wishDelete (pId: number):Observable<number>{
    return this.http.delete<number>(`${environment.baseUrl}${this.wishUrl}/delete/${this.uId}/${pId}`, this.httpOptions);
  }

  wishDeleteAll ():Observable<number>{
    return this.http.delete<number>(`${environment.baseUrl}${this.wishUrl}/delete_all/${this.uId}`, this.httpOptions);
  }




}
