import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PreviousOrder } from '../models/previousorder';
import { PreviousOrderItem } from '../models/previousorderitem';

@Injectable({
  providedIn: 'root'
})
export class PreviousorderService {
  httpOptions={headers:new HttpHeaders({'rolodex-token':""})}

  constructor(private http: HttpClient) {}

      //Potentially Obsolete: We may just bring both of these at once in a larger object
      getOrdersByOwner(id:number):Observable<PreviousOrder[]>{
       // this.httpOptions.headers.append('rolodex-token')
        return this.http.get<PreviousOrder[]>(environment.baseUrl+'/order'//Route needed: expected: /orders/{id}
        ,{headers:environment.headers});
      }


   
}
