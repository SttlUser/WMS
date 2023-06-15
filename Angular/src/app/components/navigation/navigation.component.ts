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
  constructor(private router: Router) { }
  goToLogin() {
    this.loginText = true;
    // console.log("logging in");
    this.router.navigate(['/login']);

  }
  logout() {
    localStorage.removeItem('error');
    this.loginText = false;
    console.log("logging out");
    this.router.navigate(['/']);
  }
}
