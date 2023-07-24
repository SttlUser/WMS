import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import {HttpClient} from '@angular/common/http'
import { environment } from 'src/environment';
import {ReactiveFormsModule, FormControl,FormGroup} from '@angular/forms'
import {CustomerService} from '../../customer.service'
import { ToastService } from '../toast/toast.service';
import { ToastComponent } from '../toast/toast.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import {  FormBuilder, Validators, AbstractControl } from '@angular/forms'

//import { FormGroup, FormBuilder, Validators,AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-role-master',
  templateUrl: './roleMaster.component.html',
  styleUrls: ['./roleMaster.component.css']
})
export class RoleMasterComponent {
  isLoggedIn: boolean = true;
  ngForm=new FormGroup({
    name:new FormControl(''),
    roleid:new FormControl(1)
  })


  error_login ="SOMETHING WENT WRONG";
  message = "ROLE CREATED SUCCESSFULLY";
  items:any = [];
  url:string=`${environment.api.server}/RoleMater/GetRoleTypes`;
  url2:string=`${environment.api.server}/RoleMater/CreateRole`;
  showNavbar: boolean=true;
  

  constructor(private router: Router, http:HttpClient,private resto:CustomerService,private toastService: ToastService,private snackBar: MatSnackBar) {
    this.Getdata(http)
    // const err = JSON.parse(localStorage.getItem('error') || '{}');
    // if (err.code !== 0) {
    //   console.log("Error", err);
    //   this.toastService.recieve(this.error_login);
    //   this.router.navigate(['/login']);
    // }

        //for navbar hiding
        router.events.subscribe(
          (val)=>{
            if(val instanceof NavigationEnd){
              if(val.url=='/roleMaster'){
                this.showNavbar=true;
              }
            }
          }
        )
  
  }

  Getdata(http: HttpClient) {
    http.get(this.url).subscribe((res: any) => {
      this.items = res;
      return this.items
    })
  }



  PostDataForm() {

    const formData = { ...this.ngForm.value };
    console.log(formData)

    const name = formData.name?.trim();
    const roleid = formData.roleid;
    if (name!.trim() === null && roleid === 0 ) {
      
      console.log('Rolename and roletype must not be empty.');
      alert('Rolename and roletype must not be empty.');
      return;
    }

    const nameRegex = /^[a-zA-Z\s]+$/;
    if (typeof name !== 'string' || !nameRegex.test(name)) {
    console.log('Rolename should not contain special characters.');
    alert('Rolename should not contain special characters.');
    return;
    }

    if (!name || roleid === null || roleid === undefined ) {
      console.log('Rolename and roletype must not be empty.');
      alert('Rolename and roletype must not be empty.');
      return;
    }
    else{
      alert("data saved")
      this.resto.postdata(formData).subscribe((data) => {
        console.log("get data", data);
        const message = 'Role Created Successfully';
        this.snackBar.openFromComponent(ToastComponent, {
          data: { message },
          duration: 2000, // Toast duration in milliseconds
          horizontalPosition: 'end',
          verticalPosition: 'top'
        });
        this.router.navigate(['/DispayRoleMaster']);
      });
    }
  }
  
}
function GetRolesDetail() {
  throw new Error('Function not implemented.');
}

