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
    const name = formData.name ?? '';
    const roleid = formData.roleid ?? '';
    if (!name?.trim() || roleid === null || roleid === undefined) {
      
      console.log('Rolename and roletype must not be empty.');
      alert('Rolename and roletype must not be empty.');
      return;
    }
    if (!name?.trim() || !roleid) {
      console.log('Rolename and roletype must not be empty.');
      alert('Rolename and roletype must not be empty.');
      return;
    }
    

    if (name.trim().toLowerCase() === roleid.toString().trim().toLowerCase()) {
      
      console.log('Rolename and roletype must be different.');
      alert('Rolename and roletype must be different.');
      return;
    }
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(name.trim())) {
      
      console.log('no special characters');
      alert('Rolename must not include Special Characters');
      return;
    }

    if (name && roleid !== undefined) {
      this.resto.postdata(formData).subscribe((data) => {

        console.log("get data", data);
        alert("Data added successfully");
        return;
      });
    }
  }
  // function GetRolesDetail() {
  //   throw new Error('Function not implemented.');
  // }
}
