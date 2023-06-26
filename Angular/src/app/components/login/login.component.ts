import { Component,Input } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environment';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router: Router, private http: HttpClient) { }
  loginText = JSON.parse(localStorage.getItem('error') || "{}")?.code === 0 ? true : false;

  Authenticate(Form: NgForm) {
    console.log('ngForm.value', Form.value)
    this.http.post(`${environment.api.server}/Login/UserLogin`, Form.value).subscribe((res: any) => {
      localStorage.setItem('error', JSON.stringify({ code: res?.errorInfo?.code, message: res?.errorInfo?.message }));
      if (res?.errorInfo?.code !== 0) {
        alert(res?.errorInfo?.message + res?.errorInfo?.code);
      } else {
      
        console.log("loggin in")
        
        localStorage.setItem('loginStatus','true')
          
        this.router.navigate(['/']);
        this.router.navigate(['/dispay-rolemaster-data']);
      }
    })
    console.log("Authenticated, Now navigating to home page", this.router)
  }
}