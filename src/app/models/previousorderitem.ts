import { ProductInfo } from "./productinfo";

export class PreviousOrderItem{

   // {
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

    productId:ProductInfo;
    quantity:number;

    constructor(productId:ProductInfo,quantity:number){
        this.productId = productId;
        this.quantity = quantity;

    }
}