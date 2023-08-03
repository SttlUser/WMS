import { Component, Inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as toastr from 'toastr';
// import toastr from 'toastr';

import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { environment } from 'src/environment';
import { SafeResourceUrl } from '@angular/platform-browser';

import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from 'src/app/customer.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  ngForm!: FormGroup;
  showForgotPassword: boolean = false;
  forgotUsername: string = '';
  forgotEmail: string = '';

  loginid: any;
  isLoading: boolean = false;

  OnInit(): void {
    this.ngForm = this.formbuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.ngForm.setValidators(this.validateLoginForm);
  }
  validateLoginForm(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const username = control.get('username');
    const password = control.get('password');

    if (
      username &&
      password &&
      username.value.trim() === '' &&
      password.value.trim() === ''
    ) {
      this.showAlertMessage('Please enter username and password');
      console.log('Function called');
      return { emptyFields: true };
    }

    return null;
  }
  showAlertMessage(message: string) {
    alert(message);
  }
  loginText =
    JSON.parse(localStorage.getItem('error') || '{}')?.code === 0
      ? true
      : false;

  login_error = 'USERNAME AND PASSWORD IS INCORRECT';
  logged_in = 'LOGED IN SUCCESSFULLY';
  forgetRecievedData: any;

  constructor(
    private router: Router,
    private http: HttpClient,

    private formbuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private resto: CustomerService
  ) {
    console.log(this.showNavbar);
  }
  ngOnInit(): void {
    // Hide the navbar component on the login page
    this.showNavbar = JSON.parse(localStorage.getItem('showNavbar') || '{}')
      ? true
      : false;
  }
  showNavbar = JSON.parse(localStorage.getItem('showNavbar') || '{}')
    ? true
    : false;

  Authenticate(Form: NgForm) {
    
    if (Form.invalid) {
      // Mark the form as touched to display validation errors
      Form.control.markAllAsTouched();
      return;
    }
    
    const username = Form.value.username;
    const password = Form.value.password;
    
    if (!username || !password) {
      alert('Please enter both username and password');
      //console.log(username)
      return;
    }
    // console.log('ngForm.value', Form.value)
    this.isLoading = true;
    this.http
    .post(`${environment.api.server}/Login/UserLogin`, Form.value)
    .subscribe((res: any) => {
      localStorage.setItem('error',JSON.stringify({code: res?.errorInfo?.code,message: res?.errorInfo?.message,}));
        if (res?.errorInfo?.code !== 0) {
          console.log('Errorx');
          alert('Username or Password is wrong');
          this.isLoading = false;
        } 
        else if (res?.errorInfo?.code == 0) {
          console.log('loggin in');
          console.log(res);
          // toastr.options = {
          //   "closeButton": true,
          //   "debug": false,
          //   "newestOnTop": false,
          //   "progressBar": false,
          //   "positionClass": "toast-top-right",
          //   "preventDuplicates": false,
          //   "showDuration": 300,
          //   "hideDuration": 1000,
          //   "timeOut": 5000,
          //   "extendedTimeOut": 1000,
          //   "showEasing": "swing",
          //   "hideEasing": "linear",
          //   "showMethod": "fadeIn",
          //   "hideMethod": "fadeOut"
          // };

          // toastr.error("Successfully login");
          sessionStorage.setItem('loggedInId', res.id);
          this.isLoading = false;
          this.router.navigate(['/DispayRoleMaster']);

          // this.toastService.recieve(this.logged_in);
        } else {
          this.isLoading = false;
        }
      });
    // console.log("Authenticated, Now navigating to home page", this.router)
  }

  // Function to toggle the display of the "Forgot Password" sectioc
  showForgotPasswordForm() {
    this.showForgotPassword = true;
  }

  backToLoginForm() {
    this.showForgotPassword = false;
  }

  submitForgotPassword(form: any) {

    // Handle forgot password form submission logic here
    console.log('Forgot Password Form Data:', form.value);
    this.forgotUsername = form.value.forgotUsername;

    if (!this.forgotUsername) {
      alert('Please enter username or email');
      //console.log(username)
      return;
    }

    this.isLoading = true;
    this.resto.forgetPassword(this.forgotUsername).subscribe(
      (response: any) => {
        console.log('receved table data', response);
        const queryParams = {
          recievedResponse: response.id,
        };
        this.isLoading = false;
        this.router.navigate(['/ForgetPasswordComponent'], { queryParams });
      },
      (error) => {
        this.isLoading = false;
        console.error('Error retrieving data:', error);
      }
    );
  }
}
