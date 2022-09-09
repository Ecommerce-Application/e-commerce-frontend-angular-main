import { Injectable } from '@angular/core';
import { environment, environment1 } from './../../environments/environment';
import {
  HttpClient,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  url: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  uploadImg(imgObject: FormData): Observable<any> {
    //const uploadImg = imgObject;
    const payload = JSON.stringify(imgObject);
    return this.http.post(`${this.url}/profile/image`, payload, {headers: environment1.headers, observe: 'response' });
  }

  public getImg(): Observable<HttpResponse<any>> {
    return this.http.get<any>(`${this.url}/profile/`, {headers: environment.headers, observe: 'response' })
  }
}
