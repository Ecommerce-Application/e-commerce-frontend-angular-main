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
 
    prodId:number;
    prodQuantity:number;
    prodPrice:number;
    prodDesc:string;
    prodImage:string;
    prodName:string;

    
    constructor(id:number,quantity:number,price:number,description:string,image:string,name:string){
        this.prodId = id;
        this.prodQuantity = quantity;
        this.prodPrice = price;
        this.prodDesc = description;
        this.prodImage = image;
        this.prodName = name;
 
     }
 }