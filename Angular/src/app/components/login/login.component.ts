import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environment';
import { SafeResourceUrl } from '@angular/platform-browser';
import { ToastService } from 'src/app/components/toast/toast.service';
import { ToastComponent } from '../toast/toast.component';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  login_error = "USERNAME AND PASSWORD IS INCORRECT";
  logged_in = "LOGED IN SUCCESSFULLY";
  snackBar: any;

  constructor(private router: Router, private http: HttpClient, private toastService: ToastService) {
    console.log(this.showNavbar)
  }
  ngOnInit(): void {
    // Hide the navbar component on the login page
    this.showNavbar = JSON.parse(localStorage.getItem('showNavbar') || "{}") ? true : false;
  }
  loginText = JSON.parse(localStorage.getItem('error') || "{}")?.code === 0 ? true : false;
  showNavbar = JSON.parse(localStorage.getItem('showNavbar') || "{}") ? true : false;
  Authenticate(Form: NgForm) {
    console.log('ngForm.value', Form.value)
    this.http.post(`${environment.api.server}/Login/UserLogin`, Form.value).subscribe((res: any) => {
      localStorage.setItem('error', JSON.stringify({ code: res?.errorInfo?.code, message: res?.errorInfo?.message }));
      if (res?.errorInfo?.code !== 0) {
        // alert(res?.errorInfo?.message);
        // this.toastService.recieve(this.login_error);
      } else {

        console.log("loggin in")

        this.router.navigate(['/DispayRoleMaster']);
        const message = 'Login Successfully';
        this.snackBar.openFromComponent(ToastComponent, {
          data: { message },
          duration: 2000, // Toast duration in milliseconds
          horizontalPosition: 'end',
          verticalPosition: 'top'
        });
        this.toastService.recieve(this.logged_in);
      }
    })
    console.log("Authenticated, Now navigating to home page", this.router)
  }
}