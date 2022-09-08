import { Injectable } from '@angular/core';
import { environment, baseUrl } from './../../environments/environment';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams
} from '@angular/common/http';
import { Address } from '../models/address';
import { Observable } from 'rxjs';
import { Payment } from '../models/payment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  httpOptions = {
  }

  url: string = `${environment.baseUrl}`;

  constructor(private http: HttpClient) { }

  public updateUser(pswd: string): Observable<any> {
    const updateUser = {userPassword: pswd};
    const payload = JSON.stringify(updateUser);
    return this.http.patch<any>(`${this.url}/profile`, payload, {headers: environment.headers, withCredentials: environment.withCredentials})
  }

  public updateAddress(address1: string, address2: string, city: string, state: string, zip: string): Observable<any> {
    const updateAddress = {address1: address1, address2: address2, city: city, state: state, zip: zip};
    const payload = JSON.stringify(updateAddress);
    return this.http.patch<any>(`${this.url}/profile`, payload, {headers: environment.headers});
  }

  updateCC(ccNumber: string, exp: string, svg: string): Observable<any> {
    const updateCC = {ccNumber: ccNumber, exp: exp, svg: svg};
    const payload = JSON.stringify(updateCC);
    return this.http.patch<any>(`${this.url}/profile`, payload, {headers: environment.headers});
  }
}
