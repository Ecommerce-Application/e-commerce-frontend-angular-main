export class Payment {
    ccNumber: string;
    exp: string;
    svg: string;

    constructor (ccNumber: string, exp: string, svg: string) {
        this.ccNumber = ccNumber;
        this.exp = exp;
        this.svg = svg;
    }
}
