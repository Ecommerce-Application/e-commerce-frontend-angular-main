import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  hide = true;
  hide1 = true;
  errorMessage: string = "";
  readonly validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  readonly validPasswordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;



  registerForm = new UntypedFormGroup({
    fname: new UntypedFormControl(''),
    lname: new UntypedFormControl(''),
    email: new UntypedFormControl(''),
    password: new UntypedFormControl(''),
    passwordConfirm: new UntypedFormControl('')
  })

  newEmail: string = "";
  newPassword: string = "";
  newPasswordConfirm: string = "";

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log(this.registerForm);
    this.newEmail = this.registerForm.get("email")?.value;
    this.newPassword = this.registerForm.get('password')?.value;
    this.newPasswordConfirm = this.registerForm.get('passwordConfirm')?.value;
    console.log(this.newEmail);
    console.log(this.newPassword);
    if(!this.registerForm.get('fname')?.value || !this.registerForm.get('lname')?.value || !this.registerForm.get('email')?.value || !this.registerForm.get('password')?.value){
      this.errorMessage="No empty fields allowed";
      return;
    } else if(!this.newEmail.match(this.validRegex)){
      this.errorMessage="Invalid email format";
      return;
    } else if(!this.newPassword.match(this.validPasswordRegex)){
      this.errorMessage = "Invalid password format.";
      return;
    } else if(this.newPassword != this.newPasswordConfirm){
      this.errorMessage="Passwords do not match";
      return;
    }
    this.authService.register(this.registerForm.get('fname')?.value, this.registerForm.get('lname')?.value, this.registerForm.get('email')?.value, this.registerForm.get('password')?.value).subscribe(
      () => console.log("New user registered"),
      (err) => {console.log(err); this.errorMessage},
      () => this.router.navigate(['login'])
    );
  }

}
