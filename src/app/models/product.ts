export class Product {
    prodId: number;
    prodName: string;
    prodQuantity: number;
    prodPrice: number;
    prodDesc: string;
    prodImage: string;

    constructor (prodId: number, name: string, quantity: number, description: string, price: number, image: string) {
        this.prodId = prodId;
        this.prodName = name;
        this.prodQuantity = quantity;
        this.prodDesc = description;
        this.prodPrice = price;
        this.prodImage = image;
    }
}
