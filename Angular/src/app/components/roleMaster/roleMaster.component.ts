import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient} from '@angular/common/http'
import { environment } from 'src/environment';
import {ReactiveFormsModule, FormControl,FormGroup} from '@angular/forms'
import {CustomerService} from '../../customer.service'

@Component({
  selector: 'app-role-master',
  templateUrl: './rolemaster.component.html',
  styleUrls: ['./rolemaster.component.css']
})
export class RoleMasterComponent {
  ngForm=new FormGroup({
    name:new FormControl(''),
    roleid:new FormControl(1)
  })


  

  items:any = [];
  url:string=`${environment.api.server}/RoleMater/GetRoleTypes`;
  url2:string=`${environment.api.server}/RoleMater/CreateRole`;
  

  constructor(private router: Router, http:HttpClient,private resto:CustomerService) {
    this.Getdata(http)
    const err = JSON.parse(localStorage.getItem('error') || '{}');
    if (err.code !== 0) {
      console.log("Error", err);
      this.router.navigate(['/login']);
    }
  }
  Getdata(http:HttpClient){
      http.get(this.url).subscribe((res: any) => {
        this.items = res;
        return this.items
      })
  }

  PostDataForm(){
    const formData = { ...this.ngForm.value };
    console.log(formData)
    if (formData.name && formData.roleid !== undefined) {
      this.resto.postdata(formData).subscribe((data) => {
        console.log("get data", data);
      });
    }
  }
}
function GetRolesDetail() {
  throw new Error('Function not implemented.');
}

