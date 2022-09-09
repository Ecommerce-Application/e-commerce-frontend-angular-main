import { HttpClient, HttpRequest } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  //Personal Info
  firstName = "";
  lastName = "";
  email = "";
  pswd1 = "";
  pswd2 = "";

  //Address Info
  street1 = "";
  street2 = "";
  city = "";
  state = "";
  zip = "";

  //Credit Card Form
  ccNumber = "";
  exp = "";
  svg = "";
  zipCode = "00000";

  //Boolean Variables for Toggles
  downInfo: boolean = true;
  upInfo: boolean = false;
  downAdd: boolean = true;
  upAdd: boolean = false;
  downCC: boolean = true;
  upCC: boolean = false;

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

  //constructor( private router: Router, private http: HttpClient, private userService: UserService, private user: User, private address: Address, private payment: Payment) {}
  
  constructor(private router: Router, private http: HttpClient, private userService: UserService) {}
  ngOnInit(): void {
    this.getAllProfileInfo();
    this.getAllAddInfo();
    this.getAllCCInfo();
  }

  //GET Requests
  getAllProfileInfo() {
    this.userService.getAllUserInfo().subscribe({
      next: (response) => {
        this.firstName = response.body.user_profile.firstName;
        this.lastName = response.body.user_profile.lastName;
        this.email = response.body.user_profile.userEmail;
    },
      error: (error) => {
        console.log(error);
    }
  })
  }

  getAllAddInfo() {
    this.userService.getAllAddInfo().subscribe({
      next: (response) => {
        console.log(response);
        this.street1 = response.body.street;
        this.city = response.body.city;
        this.state = response.body.state;
        this.street2 = response.body.country;
        this.zip = response.body.zipCode;
    },
      error: (error) => {
        console.log(error);
    }
  })
  }

  getAllCCInfo() {
    this.userService.getAllCCInfo().subscribe({
      next: (response) => {
        console.log(response);
        this.ccNumber = response.body.ccNumber;
        this.exp = response.body.expPeriod;
        this.zipCode = response.body.zipCode;
        this.svg = response.body.svcCode;
    },
      error: (error) => {
        console.log(error);
    }
  })
  }

  //Update User Information
  saveUser() {
    if (this.pswd1 == this.pswd2) {
      this.userService.updateUser(this.pswd1).subscribe({
        next: (response) => {
          this.editUserMode = !this.editUserMode;
          this.displayUserMode = !this.displayUserMode;
          this.errorMessage="";
      },
        error: (error) => {
          this.errorMessage="Error, please try again";
      }
    })
    } else {
      this.errorMessage="Passwords do not match";
      this.pswd1 = "";
      this.pswd2 = "";
    }
  }

  editUser() {
    this.editUserMode = !this.editUserMode;
    this.displayUserMode = !this.displayUserMode;

    this.errorMessage = "";
  }

  //Update Address Information
  saveAddress() {
      this.userService.updateAddress(this.street1, this.city, this.state, this.street2, this.zipCode).subscribe({
        next: (response) => {
          this.editAddMode = !this.editAddMode;
          this.displayAddMode = !this.displayAddMode;
          this.errorMessage="";
      },
        error: (error) => {
          this.errorMessage="Error, please try again";
      }
    })
  }

  editAddress() {
    this.editAddMode = !this.editAddMode;
    this.displayAddMode = !this.displayAddMode;

    this.errorMessage = "";
  }

  //Update Credit Card Information
  saveCC() {
    this.userService.updateCC(this.ccNumber, this.exp, this.zipCode, this.svg).subscribe({
      next: (response) => {
        this.editCCMode = !this.editCCMode;
        this.displayCCMode = !this.displayCCMode;
        this.errorMessage="";
  },
  error: (error) => {
    this.errorMessage="Error, please try again";
      }
    })
  }

  editCC() {
    this.editCCMode = !this.editCCMode;
    this.displayCCMode = !this.displayCCMode;

    this.errorMessage = "";
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
