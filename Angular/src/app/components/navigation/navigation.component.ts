import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent {
  // loginState = JSON.parse(localStorage.getItem('error') || "{}")?.code
  // loginText = JSON.parse(localStorage.getItem('error') || "{}")?.code === 0 ? 'Logout' : 'Login';
  loginText = JSON.parse(localStorage.getItem('error') || "{}")?.code === 0 ? true : false;
  loginStatus = localStorage.getItem('loginStatus') === 'true' ? true : false;
  constructor(private router: Router) { }
  goToLogin() {
    this.loginText = false;
    // console.log("logging in");
    this.router.navigate(['/login']);

  }
  logout() {
    localStorage.removeItem('error');
    localStorage.removeItem('loginStatus');
    this.loginText = true;
    console.log("logging out");
    this.router.navigate(['/']);
  }
}
