export class ProductInfo{

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
 
    id:number;
    quantity:number;
    price:number;
    description:string;
    image:string;
    name:string;

    
    constructor(id:number,quantity:number,price:number,description:string,image:string,name:string){
        this.id = id;
        this.quantity = quantity;
        this.price = price;
        this.description = description;
        this.image = image;
        this.name = name;
 
     }
 }