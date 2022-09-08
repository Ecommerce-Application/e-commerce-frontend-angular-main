import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';
import { Wish } from '../models/wish';

@Injectable({
  providedIn: 'root'
})
export class WishHttpService {
  private wishUrl: string = "/api/wish";

  sessiontoken = sessionStorage.getItem('token');
  uId = sessionStorage.getItem('userId');

  httpOptions = {
    headers: new HttpHeaders({'Content-Type' : 'application/json', 
                            'rolodex-token': `${this.sessiontoken}`})
  }

  constructor(private http: HttpClient) { }

  public getwishListByUserId(): Observable<Product[]> {
    return this.http.get<Product[]>(environment.baseUrl+this.wishUrl+this.uId, this.httpOptions);
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
