import { animate, group, state, style, transition, trigger } from '@angular/animations';
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
  ccNum1 = "";
  ccNum2 = "";
  ccNum3 = "";
  ccNum4 = "";
  ccNumber = "";
  expMM = "";
  expYY = "";
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

  //Errors
  errorMessage = '';
  errorMessagePswd = '';
  errorMessageStreet = '';
  errorMessageStreet2 = '';
  errorMessageCity = '';
  errorMessageState = '';
  errorMessageZip = '';
  errorMessageccNum1 = '';
  errorMessageccNum2 = '';
  errorMessageccNum3 = '';
  errorMessageccNum4 = '';
  errorMessageexpMM = '';
  errorMessageexpYY = '';
  errorMessageSVG = '';

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
        this.ccNum1 = this.ccNumber.substring(0,4);
        this.ccNum2 = this.ccNumber.substring(4,8);
        this.ccNum3 = this.ccNumber.substring(8,11);
        this.ccNum4 = this.ccNumber.substring(12,this.ccNumber.length);
        this.exp = response.body.expPeriod;
        this.expMM = this.exp.substring(0,2);
        this.expYY = this.exp.substring(2,this.exp.length);
        this.svg = response.body.svcCode;
    },
      error: (error) => {
        console.log(error);
    }
  })
  }

  //Update User Information
  saveUser() {
    this.errorMessage="";
    this.errorMessagePswd="";

    if (this.pswd1 == this.pswd2) {
      this.userService.updateUser(this.pswd1).subscribe({
        next: (response) => {
          this.editUserMode = !this.editUserMode;
          this.displayUserMode = !this.displayUserMode;
          this.errorMessage="";
          this.noUserData = false;
      },
        error: (error) => {
          this.errorMessagePswd="Password does not meet requirement";
          this.pswd1 = "";
          this.pswd2 = "";
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
    this.errorMessage = "";
    this.errorMessageStreet = "";
    this.errorMessageStreet2 = "";
    this.errorMessageCity = "";
    this.errorMessageState = "";
    this.errorMessageZip = "";

      this.userService.updateAddress(this.street1, this.city, this.state, this.street2, this.zip).subscribe({
        next: (response) => {
          this.editAddMode = !this.editAddMode;
          this.displayAddMode = !this.displayAddMode;
          this.noAddData = false;
      },
        error: (error) => {
          if(this.street2.length < 3) {
            this.errorMessageStreet2 ="Country selection is required";
          } if(this.street1.length < 3) {
            this.errorMessageStreet ="Street does not meet requirement";
          } if(this.city.length < 3) {
            this.errorMessageCity ="City does not meet requirement";
          } if(this.state.length < 1) {
            this.errorMessageState ="State selection is required";
          } if(this.zip.length < 5) {
            this.errorMessageZip ="Zip does not meet requirement";
          }
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
    this.errorMessage = "";
    this.errorMessageccNum1 = "";
    this.errorMessageccNum2 = "";
    this.errorMessageccNum3 = "";
    this.errorMessageccNum4 = "";
    this.errorMessageexpMM = "";
    this.errorMessageexpYY = "";
    this.errorMessageSVG = "";
    this.exp = this.expMM + this.expYY;
    this.ccNumber = this.ccNum1 + this.ccNum2 + this.ccNum3 + this.ccNum4;
    this.userService.updateCC(this.ccNumber, this.exp, this.zipCode, this.svg).subscribe({
      next: (response) => {
        this.editCCMode = !this.editCCMode;
        this.displayCCMode = !this.displayCCMode;
        this.errorMessage="";
        this.noCCData = false;
  },
  error: (error) => {
    if(this.ccNum1.length < 4) {
      this.errorMessageccNum1 ="Input does not meet requirement";
    } if(this.ccNum2.length < 4) {
      this.errorMessageccNum2 ="Input does not meet requirement";
    } if(this.ccNum3.length < 4) {
      this.errorMessageccNum3 ="Input does not meet requirement";
    } if(this.ccNum4.length < 4) {
      this.errorMessageccNum4 ="Input does not meet requirement";
    } if(this.expMM.length < 2) {
      this.errorMessageexpMM ="Input does not meet requirement";
    } if(this.expYY.length < 2) {
      this.errorMessageexpYY ="Input does not meet requirement";
    } if(this.svg.length < 3) {
      this.errorMessageSVG ="Input does not meet requirement";
    }
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
