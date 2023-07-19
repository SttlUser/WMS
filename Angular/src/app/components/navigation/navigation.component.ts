import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastService } from 'src/app/components/toast/toast.service';
import { CustomerService } from 'src/app/customer.service';

@Component({
  
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
 
})
export class NavigationComponent {
 
  isLoggedIn: boolean = false;
  logged_out = "LOGGED OUT SUCCESSFULLY";
  
  // loginState = JSON.parse(localStorage.getItem('error') || "{}")?.code
  // loginText = JSON.parse(localStorage.getItem('error') || "{}")?.code === 0 ? 'Logout' : 'Login';
  loginText = JSON.parse(localStorage.getItem('error') || "{}")?.code === 0 ? true : false;
  loginStatus = localStorage.getItem('loginStatus') === 'true' ? true : false;
  
  constructor(private router: Router,private toastService: ToastService) {
    const err = JSON.parse(localStorage.getItem('error') || '{}');
    if (err.code !== 0) {
      console.log("Error", err);
      this.router.navigate(['/login']);
      // console.log(this.data);
    }
    
   }
  
  goToLogin() {
    this.loginText = true;
    // console.log("logging in");
    this.router.navigate(['/login']);
    
  }
  logout() {
    if (window.confirm("Do you really want to Logout?")) {
    localStorage.removeItem('error');
    console.log("logging out");
    this.toastService.recieve(this.logged_out);
    this.loginText = false;
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
    }
  }
  updateForm(){
    this.router.navigate(['']); 
  }
  editRow(row: any){
    this.router.navigate(['/edit-usermaster']);
  }

  deletebtn(){

  }



}
