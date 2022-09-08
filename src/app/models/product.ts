export class Product {
    prodId: number;
    name: string;
    quantity: number;
    price: number;
    description: string;
    image: string;

    constructor (prodId: number, name: string, quantity: number, description: string, price: number, image: string) {
        this.prodId = prodId;
        this.name = name;
        this.quantity = quantity;
        this.description = description;
        this.price = price;
        this.image = image;
    }
}
