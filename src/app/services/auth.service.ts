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
  registerUrl: string = `${environment.baseUrl}`;
  loggedIn: boolean = false;
  // private httpOptions = {
  //   headers: new HttpHeaders({'Content-Type' : 'application/json'}),
  //   // observe: 'response'
  // }
  private header = new HttpHeaders({ 'Content-Type': 'application/json', });



  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    const payload = { userEmail: email, userPassword: password };
    // return this.http.post<HttpResponse <any>>(`${this.authUrl}/login`, payload, {headers: this.httpOptions.headers, observe: 'response' as 'body'});
    return this.http.post<HttpResponse<any>>(`${this.authUrl}/login`, payload, { headers: this.header, observe: 'response' });
  }

  logout(): Observable<any> {
    console.log(sessionStorage.getItem('token'))
    console.log(`${this.authUrl}/logout`);
    console.log(environment.headers)
    return this.http.post<any>(`${this.authUrl}/logout`, {}, { headers: environment.headers, observe: 'response' });
  }

  register(firstName: string, lastName: string, email: string, password: string): Observable<any> {
    const payload = {firstName: firstName, lastName: lastName, userEmail: email, userPassword: password};
    return this.http.post<HttpResponse <any>>(`${this.registerUrl}/register`, payload, {headers: this.header, observe: 'response'});
  }
}
