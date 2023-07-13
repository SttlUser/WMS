import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environment';
import { ReactiveFormsModule, FormControl, FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms'
import { CustomerService } from '../../customer.service';
//import { FormGroup, FormBuilder, Validators,AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-role-master',
  templateUrl: './roleMaster.component.html',
  styleUrls: ['./roleMaster.component.css']
})
export class RoleMasterComponent {
  ngForm = new FormGroup({
    name: new FormControl(''),
    roleid: new FormControl(1)
  })




  items: any = [];
  url: string = `${environment.api.server}/RoleMater/GetRoleTypes`;
  url2: string = `${environment.api.server}/RoleMater/CreateRole`;


  constructor(private router: Router, http: HttpClient, private resto: CustomerService, private formbuilder: FormBuilder) {
    this.Getdata(http)
    const err = JSON.parse(localStorage.getItem('error') || '{}');
    if (err.code !== 0) {
      console.log("Error", err);
      this.router.navigate(['/login']);
    }
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
    }
  }
  
}
