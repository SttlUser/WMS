import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, NgForm,Validators, FormBuilder } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environment';
import { CustomerService } from '../../customer.service'
import { formatCurrency } from '@angular/common';

@Component({
  selector: 'app-dispaly-data',
  templateUrl: './dispaly-data.component.html',
  styleUrls: ['./dispaly-data.component.css']
})
export class DispalyDataComponent  implements OnInit {
  
  RoleData:any;
  items:any = [];

  RoledataUpdate = {
   id:"",
   name:"",
   roleTypeid:"",
   createdDate:"",
   lastModifier:"",
   roleTypeName:"",
    }

    ngForm = new FormGroup({
      id : new FormControl(''),
      name : new FormControl(''),
      roletype:new FormControl(''),
      lastModifier:new FormControl('1')
    });

    // ngForm: FormGroup = new FormGroup({
    //   name: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]),
    //   roleid: new FormControl(null, Validators.required),
    //   // Add other form controls if needed
    // });
  

  url:string=`${environment.api.server}/RoleMater/GetRoleTypes`;
  fb: any;
  constructor(private router: Router,private resto: CustomerService,public http:HttpClient,private formBuilder: FormBuilder ){
    this.GetRoleMasterData();
    this.Getdata(http);
    const err = JSON.parse(localStorage.getItem('error') || '{}');
    if (err.code !== 0) {
      console.log("Error", err);
      this.router.navigate(['/login']);
    }
  }
  ngOnInit(): void {
  //  this.ngForm = this.fb.formBuilder({
  //   name: ['', Validators.required],
  //   roleTypeid: ['', Validators.required]
    
  // });
  }
  GotoRoleMaster(){
    this.router.navigate(['/role-master'])
  }

  GetRoleMasterData(){
    console.log("receving table data");
    this.resto.getRoleMaster().subscribe(
      (response: any) => {
        console.log("receved table data", response);
        this.RoleData = response;
      },
      (error) => {
        console.error('Error retrieving data:', error);
      }
    );
  }

  Getdata(http:HttpClient){
    http.get(this.url).subscribe((res: any) => {
      this.items = res;
      console.log(this.items);
      return this.items
    })
}
// isDeleteClicked = false;

  UpdateRole(row:any){
    this.RoledataUpdate.id = row.id;
  this.RoledataUpdate.name = row.name;
  this.RoledataUpdate.roleTypeid = row.roleTypeid;
  this.RoledataUpdate.lastModifier = row.lastModifier;
  }

  DeleteRole(rol:any){
    console.log(rol);
    if (window.confirm("Do you really want to delete?"))
    {
      this.resto.DeleteRoleMasterData(rol.id,42,4).subscribe(
      (res) => {
        console.log(res);
        this.GetRoleMasterData();
        // row.isActiveRole = true;
        // this.isDeleteClicked = true;
      },
      (err) => {
        console.log(err);
      }
    )}
  }

  ActiveRole(row:any){

  }

  UpdatedRoleData(data:any){
    // const nameRegex = /^[A-Za-z\s]+$/;
    console.log("Data", data)
    const formData = { ...this.ngForm.value };
    const name = formData.name?.trim();
    const roletype = formData.roletype?.trim();
  if(!this.RoledataUpdate.name && !this.RoledataUpdate.roleTypeName){
    alert('Rolename and roletype must not be empty.');
  }

   
   
  
 
  // if (!name || !roleid) {
  //   alert('Rolename and roletype must not be empty.');
  //   return;
  // }   //for blank validation
    
  // if (!nameRegex.test(name.trim())) {
  //   console.log('Rolename must not include special characters or numerals.');
  //   alert('Rolename must not include special characters or numerals.');
  //   return;
  // }

  //   if (name.trim().toLowerCase() === roleid.toString().trim().toLowerCase()) {
      
  //     console.log('Rolename and roletype must be different.');
  //     alert('Rolename and roletype must be different.');
  //     return;
  //   }
    
    console.log("update data",data);
    // this.resto.UpdateRoleMasdterData(data).subscribe(
    //   (res) => {
    //     console.log(res);
        
    //     alert("data has been updated./")
    //   },
    //   (err) => {
    //     console.log(err);
    //   }
    // )
    this.GetRoleMasterData();
  }
  // UpdatedRoleData(data: any) {
  //   // if (this.ngForm.invalid) {
  //   //   alert('Please fix the validation errors.');
  //   //   return;
  //   // }
  //   const formData = { ...this.ngForm.value };
  //   const name = formData.name.trim();
  //   const roleid = formData.roleid.trim();
  
  //   // this.ngForm.controls['name'].setValidators([Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]);
  //   // this.ngForm.controls['roleid'].setValidators(Validators.required);
  //   // this.ngForm.updateValueAndValidity();
  //   if (!name || !roleid) {
  //     alert('Rolename and roletype must not be empty.');
  //     return;
  //   }
    
  
    
  
  //   if (name.toLowerCase() === roleid.toLowerCase()) {
  //     alert('Rolename and roletype must be different.');
  //     return;
  //   }
  
  //   console.log("Update data:", data);
  //   this.resto.UpdateRoleMasdterData(data).subscribe(
  //     (res) => {
  //       console.log(res);
  //       alert("Data has been updated.");
  //       this.ngForm.reset();
  //     },
  //     (err) => {
  //       console.log(err);
  //     }
  //   );
  //   this.GetRoleMasterData();
  // }

}
