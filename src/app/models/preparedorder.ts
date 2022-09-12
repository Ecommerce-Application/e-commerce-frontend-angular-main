export class PreviousOrder{


//{"userId": 1,"total": 200.89,"datePlaced":25895,"orderQuantityBoughts":[{ "productId":{"id":1,
//"description": "ball of choas","image":"pathimage","name": "choas ball","price": 15.89},"quantity": 5    },

    // {
    //    "productId": {
    //         "id":2,
    //         "description": "batch of choas",
    //         "image":"pathimage",
    //         "name": "choas trinket",
    //         "price": 15.89
    //     },
    //      "quantity": 8
    // }]

   
//}

// {
//     "userId": 1,
//     "total": 18.89,
//     "datePlaced":25898685,
//     "orderQuantityBoughts":[
//         {
//             "productId":1,
//             "qty":3
//         },
//         {
//              "productId":3,
//              "qty":4

//         },
//          {
//              "productId":4,
//              "qty":4

//         }

//        ]



////this model might not be used but the format will be what the back end expects from checkout






// current plan:
// set automatically
userId:number
//grabbed from the cart?//when checkout sends it to the service, send cart.total too
total:number
//generate the date
datePlaced:number
//the list of items{}
orderQuantityBoughts:any[]


 
    constructor(userId:number,total:number,datePlaced:number,orderQuantityBoughts:any[]){
        this.userId = userId
        this.total = total
        this.datePlaced = datePlaced
        this.orderQuantityBoughts = orderQuantityBoughts


    }

}