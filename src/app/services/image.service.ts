import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  url: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  uploadImg(imgObject: FormData): Observable<any> {
    const headersImage = environment.headers as HttpHeaders['headers'];
    delete headersImage['Content-Type'];
    return this.http.post<any>(`${this.url}/profile/image`, imgObject, { headers: headersImage, observe: 'response' });
  }

  public getImg(): Observable<any> {
    return this.http.get<any>(`${this.url}/profile/image`, { headers: environment.headers, observe: 'response' })
  }

}
