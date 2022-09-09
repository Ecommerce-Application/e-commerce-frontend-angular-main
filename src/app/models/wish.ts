export class Wish{
    userId: number;
    productId: number;
    wishId: number;

    constructor (userId: number, productId: number, wishId: number){
        this.userId = userId;
        this.productId = productId;
        this.wishId =wishId;
    }

}