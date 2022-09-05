import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMessage: string = "";
  loginForm = new UntypedFormGroup({
    email: new UntypedFormControl(''),
    password: new UntypedFormControl('')
  })


  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  
  onSubmit(): void {
    this.authService.login(this.loginForm.get('email')?.value, this.loginForm.get('password')?.value).subscribe(
      (response) => {
        this.authService.loggedIn=true;
        sessionStorage.setItem("tokenId", String(response.tokenId));
        sessionStorage.setItem("userEmail", response.userEmail);
        sessionStorage.setItem("fullName", response.firstName + " " + response.lastName);
        sessionStorage.setItem("address", response.addressId);
        sessionStorage.setItem("payment", response.paymentId);
      },
      (err) => {console.log(err); this.errorMessage="Invalid Email and Password"},
      () => this.router.navigate(['home'])
    );
  }

  register(): void {
    this.router.navigate(['register']);
  }

}
