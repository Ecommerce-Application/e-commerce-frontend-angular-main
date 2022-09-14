export class Product {
    prodId: number;
    prodName: string;
    prodQuantity: number;
    prodPrice: number;
    prodDesc: string;
    prodImage: string;
    isAvailable: boolean = true;
    quantityBoughts: [] = [];

    constructor (prodId: number, prodName: string, prodQuantity: number, prodDesc: string, prodPrice: number, prodImage: string, isAvailable: boolean ,quantityBoughts: []) {
        this.prodId = prodId;
        this.prodName = prodName;
        this.prodQuantity = prodQuantity;
        this.prodDesc = prodDesc;
        this.prodPrice = prodPrice;
        this.prodImage = prodImage;
        this.isAvailable = isAvailable;
        this.quantityBoughts = quantityBoughts;
    }
}
