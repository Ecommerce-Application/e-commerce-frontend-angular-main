import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authUrl: string = `${environment.baseUrl}/auth`;
  loggedIn: boolean = false;
  // private httpOptions = {
  //   headers: new HttpHeaders({'Content-Type' : 'application/json'}),
  //   // observe: 'response'
  // }
  private header = new HttpHeaders({ 'Content-Type': 'application/json' });



  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    const payload = {userEmail:email, userPassword:password};
    // return this.http.post<HttpResponse <any>>(`${this.authUrl}/login`, payload, {headers: this.httpOptions.headers, observe: 'response' as 'body'});
    return this.http.post<HttpResponse<any>>(`${this.authUrl}/login`, payload, {headers: this.header, observe: 'response' });
  }

  logout(): void{
    this.http.post(`${this.authUrl}/logout`, null);
  }

  register(firstName: string, lastName: string, email: string, password: string): Observable<any> {
    const payload = {firstName: firstName, lastName: lastName, email: email, password: password};
    return this.http.post<HttpResponse <any>>(`${this.authUrl}/register`, payload, {headers: this.header, observe: 'response'});
  }
}
