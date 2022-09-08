import { Component, OnInit } from '@angular/core';
import { PreviousOrder } from 'src/app/models/previousorder';
import { PreviousOrderItem } from 'src/app/models/previousorderitem';
import { PreviousorderService } from 'src/app/services/previousorder.service';

@Component({
  selector: 'app-previous-orders',
  templateUrl: './previous-orders.component.html',
  styleUrls: ['./previous-orders.component.css']
})
export class PreviousOrdersComponent implements OnInit {

  constructor(private previousOrder: PreviousorderService) { }

  CheckingOrder:boolean = false
  PreviousOrderList:PreviousOrder[]=[
    {"transactionId": 2,"userId": 2,"total": 200.89,"datePlaced": 25898585,
          "orderQuantityBoughts": [
              {"productId": {"id": 1,"quantity": 50,"price": 15.89,"description": "ball of choas","image": "pathimage","name": "choas ball"},
                  "quantity": 5
              },
              {
                  "productId": {
                      "id": 2,
                      "quantity": 50,
                      "price": 15.89,
                      "description": "batch of choas",
                      "image": "pathimage",
                      "name": "choas trinkets"
                  },
                  "quantity": 8
              }
          ]
      }
  ];
  ProductList:PreviousOrderItem[]=[];
  //PreviousOrderItemList:PreviousOrderItem[]=[];
  orderId:number = 1

  ngOnInit(): void {
  }




  GoBack(){
    this.CheckingOrder = false
    //this.PreviousOrderItemList = [];
  }
///////////this gets the orders
  getOrders(id:number){
    //Run the order here
    this.previousOrder.getOrdersByOwner(1).subscribe(
      (response)=>{
        this.PreviousOrderList= response

      }
    )


  }
///////////////////this gets the items from an order
/////Should run some formatting Operations in here
  checkOrder(id:number){
    // this.previousOrder.getOrderItems(id).subscribe(
    //   (response)=>{
    //     this.PreviousOrderItemList= response
    let index=this.PreviousOrderList.findIndex(form=>form.transactionId==id)
    this.ProductList = this.PreviousOrderList[index].orderQuantityBoughts


       // this.orderId = index
        this.CheckingOrder = true

      //}
    //)
  }


}
