export class User {

    //Personal Info
    firstName: string | null = 'First Name';
    lastName: string | null = 'Last Name';
    email: string | null = 'email@mail.com';
    pswd: string | null = 'password1';

    constructor (
        firstName: string,
        lastName: string,
        email: string,
        pswd: string,
    ) {
        this.firstName = firstName
        this.lastName = lastName
        this.email = email
        this.pswd = pswd
    }
}
