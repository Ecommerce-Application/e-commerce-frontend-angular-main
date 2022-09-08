import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Address } from 'src/app/models/address';
import { Payment } from 'src/app/models/payment';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  //Personal Info
  firstName = this.user.firstName;
  lastName = this.user.lastName;
  email = this.user.email;
  pswd = this.user.pswd;

  //Address Info
  street1 = this.address.address1;
  street2 = this.address.address2;
  city = this.address.city;
  state = this.address.state;
  zip = this.address.zip;

  //Credit Card Form
  ccNumber = this.payment.ccNumber;
  exp = this.payment.exp;
  svg = this.payment.svg;

  //Boolean Variables for Toggles
  downInfo: boolean = true;
  upInfo: boolean = false;
  downAdd: boolean = true;
  upAdd: boolean = false;
  downCC: boolean = true;
  upCC: boolean = false;

  router: any;
  errorMessage: string = '';

  //Edit Display Mode Variables
  editUserMode: boolean = false;
  displayUserMode: boolean = true;

  editAddMode: boolean = false;
  displayAddMode: boolean = true;

  editCCMode: boolean = false;
  displayCCMode: boolean = true;

  //No Data Alert Variables
  noUserData: boolean = true;
  noAddData: boolean = true;
  noCCData: boolean = true;

  constructor(private http: HttpClient, private userService: UserService, private user: User, private address: Address, private payment: Payment) {}
  
  ngOnInit(): void {
  }

  //Update User Information
  saveUser() {
    // this.userService.updateUser(this.pswd).subscribe({
    //   next: (response) => {
        
    //   }
    // })

    this.editUserMode = !this.editUserMode;
    this.displayUserMode = !this.displayUserMode;
  }

  //Update Address Information
  saveAddress() {

    this.editAddMode = !this.editAddMode;
    this.displayAddMode = !this.displayAddMode;
  }

  //Update Credit Card Information
  saveCC() {

    this.editCCMode = !this.editCCMode;
    this.displayCCMode = !this.displayCCMode;
  }

  //Toggle Arrows
  upDownInfo() {
    if (this.firstName) {
      this.noUserData = false;
      this.displayUserMode = true;
    }
    
    this.downInfo = !this.downInfo;
    this.upInfo = !this.upInfo;
    this.editUserMode = false;
    this.displayUserMode = true;
  }

  upDownAdd() {
    if (this.street1) {
      this.noAddData = false;
      this.displayAddMode = true;
    }

    this.downAdd = !this.downAdd;
    this.upAdd = !this.upAdd;
    this.editAddMode = false;
    this.displayAddMode = true;
  }

  upDownCC() {
    if (this.ccNumber) {
      this.noCCData = false;
      this.displayCCMode = true;
    }

    this.downCC = !this.downCC;
    this.upCC = !this.upCC;
    this.editCCMode = false;
    this.displayCCMode = true;
  }
}
