import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import {
  HttpClient,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {


  httpOptions = {
  }

  url: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  //User Functions
  public updateUser(pswd: string): Observable<any> {
    const updateUser = {userPassword: pswd};
    const payload = JSON.stringify(updateUser);
    return this.http.patch<any>(`${this.url}/profile`, payload, {headers: environment.headers, observe: 'response' })
  }

  public getAllUserInfo(): Observable<HttpResponse<any>> {
    return this.http.get<any>(`${this.url}/profile/all`, {headers: environment.headers, observe: 'response' })
  }


  //Address Functions
  public updateAddress(street1: string, city: string, state: string, street2: string, zip: string): Observable<any> {
    const updateAddress = {street: street1, city: city, state: state, country: street2, zipCode: zip};
    const payload = JSON.stringify(updateAddress);
    return this.http.post<any>(`${this.url}/profile/uaddress`, payload, {headers: environment.headers});
  }

  public getAllAddInfo(): Observable<HttpResponse<any>> {
    return this.http.get<any>(`${this.url}/profile/uaddress`, {headers: environment.headers, observe: 'response' })
  }

  //Credit Card Functions
  updateCC(ccNumber: string, exp: string, zipCode: string, svg: string): Observable<any> {
    const updateCC = {ccNumber: ccNumber, expPeriod: exp, zipCode: zipCode, svcCode: svg};
    const payload = JSON.stringify(updateCC);
    return this.http.post<any>(`${this.url}/profile/upayment`, payload, {headers: environment.headers, observe: 'response' });
  }

  public getAllCCInfo(): Observable<HttpResponse<any>> {
    return this.http.get<any>(`${this.url}/profile/upayment`, {headers: environment.headers, observe: 'response' })
  }
}
