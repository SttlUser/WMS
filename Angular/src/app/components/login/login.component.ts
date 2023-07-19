
import { Component,Input,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AbstractControl, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
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

export class LoginComponent implements  OnInit {
  ngForm!: FormGroup;

  
  OnInit(): void {
    this.ngForm = this.formbuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.ngForm.setValidators(this.validateLoginForm);
  }
  validateLoginForm(control: AbstractControl): { [key: string]: boolean } | null {
    const username = control.get('username');
    const password = control.get('password');

    if (username && password && username.value.trim() === '' && password.value.trim() === '') {
      this.showAlertMessage('Please enter username and password');
      console.log("Function called");
      return { 'emptyFields': true };

    }

    return null;
  }
  showAlertMessage(message: string) {
    alert(message);
  }
  loginText = JSON.parse(localStorage.getItem('error') || "{}")?.code === 0 ? true : false;

  login_error = "USERNAME AND PASSWORD IS INCORRECT";
  logged_in = "LOGED IN SUCCESSFULLY";
  snackBar: any;

  constructor(private router: Router, private http: HttpClient, private toastService: ToastService,private formbuilder:FormBuilder) {
    console.log(this.showNavbar)
  }
  ngOnInit(): void {
    // Hide the navbar component on the login page
    this.showNavbar = JSON.parse(localStorage.getItem('showNavbar') || "{}") ? true : false;
  }
  showNavbar = JSON.parse(localStorage.getItem('showNavbar') || "{}") ? true : false;

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
      return;
    }
    // console.log('ngForm.value', Form.value)
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
    // console.log("Authenticated, Now navigating to home page", this.router)
  }
}
