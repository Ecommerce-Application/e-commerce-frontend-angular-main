import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'E-Commerce Client';

  public static isLoggedIn: boolean = false;


  get staticIsLoggedIn() {
    return sessionStorage.getItem('isLoggedIn')?.valueOf;
  }
}
