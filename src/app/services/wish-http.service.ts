import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class WishHttpService {
  private wishUrl: string = "/api/wish";

  httpOptions = {
    headers: new HttpHeaders({'Content-Type' : 'application/json'})
  }

  constructor(private http: HttpClient) { }

  public getwishListByUserId(id: number): Observable<Product[]> {
    return this.http.get<Product[]>(environment.baseUrl+this.wishUrl+id, {headers: environment.headers, withCredentials: environment.withCredentials});
  }

  addDoctor(pId:number , uId: number): Observable<Wish>{
    let bodyD: any = { "pId":pId, 
                       "uId":uId};
    let jsonBody = JSON.stringify(bodyD);
    return this.http.post<wish>(`${environment.baseUrl}${this.wishUrl}`,jsonBody,this.httpOptions);
  }

  wishDelete (id: number):Observable<number>{
    
    return this.http.delete<number>(environment.baseUrl+this.wishUrl+id);
  }

}
