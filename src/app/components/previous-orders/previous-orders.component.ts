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
  PreviousOrderList:PreviousOrder[]=[];
  ProductList:PreviousOrderItem[]=[];
  //PreviousOrderItemList:PreviousOrderItem[]=[];
  orderId:number = 1

  ngOnInit(): void {
    window.sessionStorage.setItem('rolodex-token','1')
    let data = window.sessionStorage.getItem('rolodex-token')
    this.getOrders(1)
  }




  GoBack(){
    this.CheckingOrder = false
    //this.PreviousOrderItemList = [];
  }
///////////this gets the orders
  getOrders(id:number){
    //Run the order here
    this.previousOrder.getOrdersByOwner(id).subscribe(
      (response)=>{
        console.log("in check order")
        console.log(response)
        this.PreviousOrderList= response

      },(error)=>{
        console.log("Error! invalid response")
        console.log(error)
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
