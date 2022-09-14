import { PreviousOrderItem } from "./previousorderitem"

export class PreviousOrder{

///////////the final object that is coming in for the list
/////set of properties
////set of the items, which contain an array

////the quantity in the lowest array references warehouse stock
    // [{"transactionId": 2,"userId": 2,"total": 200.89,"datePlaced": 25898585,
    //         "orderQuantityBoughts": [
    //             {"productId": {"id": 1,"quantity": 50,"price": 15.89,"description": "ball of choas","image": "pathimage","name": "choas ball"},
    //                 "quantity": 5
    //             },
    //             {
    //                 "productId": {
    //                     "id": 2,
    //                     "quantity": 50,
    //                     "price": 15.89,
    //                     "description": "batch of choas",
    //                     "image": "pathimage",
    //                     "name": "choas trinkets"
    //                 },
    //                 "quantity": 8
    //             }
    //         ]
    //     }
    // ]
    

///////////////The overall object is an array, with an array, with an object that contains an object
//////If you have to read this, good luck.



////this might be changed in the future, but this is what we expect

    userId:number
    total:number
    datePlaced:number
    transactionId:number
    //this is a list of the products, contained in the object
    orderQuantityBoughts:PreviousOrderItem[]
    
    
     
        constructor(userId:number,total:number,datePlaced:number,transactionId:number,orderQuantityBoughts:PreviousOrderItem[]){
            this.userId = userId
            this.total = total
            this.datePlaced = datePlaced
            this.transactionId = transactionId
            this.orderQuantityBoughts = orderQuantityBoughts
    
    
        }
    
    }