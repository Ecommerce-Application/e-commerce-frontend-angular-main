import { Product } from "./product";

export class Wish{
    userId: number;
    productId: number;
    wishId: number;
    product: Product;

    constructor (userId: number, productId: number, wishId: number, product: Product){
        this.userId = userId;
        this.productId = productId;
        this.wishId = wishId;
        this.product = product;
    }

}