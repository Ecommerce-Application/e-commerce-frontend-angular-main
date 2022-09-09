export class User {

    userId: number;
    firstName: string;
    lastName: string;
    userEmail: string;
    userPassword: string;
    tokenId: string;

    constructor (userId: number, firstName: string, lastName: string, userEmail: string, userPassword: string, tokenId: string){
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName
        this.userEmail = userEmail;
        this.userPassword = userPassword;
        this.tokenId = tokenId;
    }
}