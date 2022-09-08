import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PreviousOrder } from '../models/previousorder';
import { PreviousOrderItem } from '../models/previousorderitem';

@Injectable({
  providedIn: 'root'
})
export class PreviousorderService {

  constructor(private http: HttpClient) {}

      //Potentially Obsolete: We may just bring both of these at once in a larger object
      getOrdersByOwner(id:number):Observable<PreviousOrder[]>{
        return this.http.get<PreviousOrder[]>(environment.baseUrl+'/order/'+id//Route needed: expected: /orders/{id}
        );
      }


      getOrderItems(id:number):Observable<PreviousOrderItem[]>{
        return this.http.get<PreviousOrderItem[]>(environment.baseUrl+'/orderID/'+id//Route needed: expected: /orders/{id}
        );
      }

   
}