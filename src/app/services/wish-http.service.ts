import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
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

  wishCounterS: Subject<number> = new Subject<number>();
  wishCounter: number =0;
  prodIdList = new Set<number>();


  sessiontoken = window.sessionStorage.getItem('token');
  uId = window.sessionStorage.getItem('userId');

  httpOptions = {
    headers: new HttpHeaders({'Content-Type' : 'application/json',
                            'rolodex-token': `${this.sessiontoken}`})
  }

  constructor(private http: HttpClient) { }

  public getwishListByUserId(): Observable<Product[]> {

    return this.http.get<Product[]>(environment.baseUrl+this.wishUrl+"/get/"+this.uId, this.httpOptions);
  }

  check(): void{
    this.getwishListByUserId().subscribe({
      next: (wish) => {
        wish.forEach((w)=>{this.prodIdList.add(w.prodId)});
      }
    })
    console.log('prodlist');
    console.log(this.prodIdList);
  }


  addWish(pId:number): Observable<Wish>{
    // check if the product is already in the wish list or not
    // only add if it is not in the wish list
    // only increment the wish counter if the product is not in the wish list
    if(!this.prodIdList.has(pId)){
      this.wishCounter++;
      this.wishCounterS.next(this.wishCounter);
      this.prodIdList.add(pId);
    }
    return this.http.post<Wish>(`${environment.baseUrl}${this.wishUrl}/post/${Number(this.uId)}/${pId}`, this.httpOptions);

  }


  wishDelete (pId: number):Observable<number>{
    this.prodIdList.delete(pId);
    this.wishCounter--;
    this.wishCounterS.next(this.wishCounter);
    return this.http.delete<number>(`${environment.baseUrl}${this.wishUrl}/delete/${this.uId}/${pId}`, this.httpOptions);
  }

  wishDeleteAll ():Observable<number>{
    this.prodIdList.clear();
    this.wishCounter = 0;
    this.wishCounterS.next(this.wishCounter);
    return this.http.delete<number>(`${environment.baseUrl}${this.wishUrl}/delete_all/${this.uId}`, this.httpOptions);
  }




}
