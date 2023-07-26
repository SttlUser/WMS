import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {CustomerService} from '../../customer.service'
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment';
import { ToastService } from '../toast/toast.service';
import { ToastComponent } from '../toast/toast.component';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {
  isLoggedIn: boolean = true;
  message = "USER CREATED SUCCESSFULLY";
  items:any=[];
  url:string=`${environment.api.server}/RoleMater/GetRoleMasterData?id=`+1;
  snackBar: any;
  constructor(private resto:CustomerService, private router: Router ,public http:HttpClient,private toastService: ToastService,@Inject(MAT_SNACK_BAR_DATA) public data: any){
    this.Getdata(http);
  }
  applyForm = new FormGroup({
    cb_pk_id:new FormControl('1'),
    firstname: new FormControl(''),
    middlename: new FormControl(''),
    lastname: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    ins_del_id: new FormControl('90'),  
  });

  Getdata(http:HttpClient){
    this.resto.getRoleMaster(6).subscribe(
      (response: any) => {
        console.log("receved table data", response);  
        this.items = response;
        return this.items
        
      },
      (error) => {
        console.error('Error retrieving data:', error);
        const message = 'oops! something went wrong.';
        this.snackBar.openFromComponent(ToastComponent, {
          data: { message },
          duration: 2000, // Toast duration in milliseconds
          horizontalPosition: 'end',
          verticalPosition: 'top'
        });
      }
    );
}
  PostUserData(){
    const formData = { ...this.applyForm.value };
    const {
      firstname,
      middlename,
      lastname,
      username,
      password,
      email,
      phone,
      ins_del_id
      
    } = formData; 
    if (
      !firstname ||
      !middlename ||
      !lastname ||
      !username ||
      !password ||
      !email ||
      !phone ||
      !ins_del_id 
      
    ){
      console.log('Please fill in all fields.');
      alert('Please fill in all fields.');
      return;
    }
    if (!formData.firstname) {
      alert("Firstname is required");
      return;
    }
  
     if (!formData.lastname) {
      alert("Lastname is required");
      return;
    }
    if (!isCapitalized(formData.firstname) || !isCapitalized(formData.lastname) ) {
      alert("First name and last name must be in capitalized format");
      return;
    }
    function isCapitalized(value: string) {
      // Check if the first character of the value is capitalized
      return /^[A-Z]/.test(value);
    }
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
if (!passwordRegex.test(password)) {
  console.log('Password must contain at least 8 characters including at least one uppercase letter, one lowercase letter, one digit, and one special character.');
  alert('Password must contain at least 8 characters including at least one uppercase letter, one lowercase letter, one digit, and one special character.');
  return;
}

// Validate the email format
const emailRegex = /^[A-Za-z0-9._%+-]+@(gmail|yahoo|outlook|hotmail)\.(com|edu|org|net|gov|co)$/;
if (!emailRegex.test(email)) {
  console.log('Invalid email format.');
  alert('Invalid email format.');
  return;
}
const phoneRegex = /^\d{10}$/;
if (!phoneRegex.test(phone)) {
  console.log('Invalid phone number format. Please enter a 10-digit phone number.');
  alert('Invalid phone number format. Please enter a 10-digit phone number.');
  return;
}
    console.log('Details entered',formData);
    this.resto.PostUserData(formData).subscribe(
    (res)=>{
    console.log(res);  
    this.toastService.recieve(this.message);
    this.router.navigate(['/UserMaster']);
    },
    (err)=>{
      console.log(err);
      const message = 'Something went wrong.';
      this.snackBar.openFromComponent(ToastComponent, {
        data: { message },
        duration: 2000, // Toast duration in milliseconds
        horizontalPosition: 'end',
        verticalPosition: 'top'
      });
    }
    )
    
  }

}


