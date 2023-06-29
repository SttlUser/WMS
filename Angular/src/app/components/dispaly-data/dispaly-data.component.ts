import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environment';
import { CustomerService } from '../../customer.service'
import { formatCurrency } from '@angular/common';
@Component({
  selector: 'app-dispaly-data',
  templateUrl: './dispaly-data.component.html',
  styleUrls: ['./dispaly-data.component.css']
})
export class DispalyDataComponent {

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
  

  url:string=`${environment.api.server}/RoleMater/GetRoleTypes`;
  constructor(private router: Router,private resto: CustomerService,public http:HttpClient ){
    this.GetRoleMasterData();
    this.Getdata(http);
    const err = JSON.parse(localStorage.getItem('error') || '{}');
    if (err.code !== 0) {
      console.log("Error", err);
      this.router.navigate(['/login']);
    }
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

  UpdateRole(row:any){
    this.RoledataUpdate.id = row.id;
  this.RoledataUpdate.name = row.name;
  this.RoledataUpdate.roleTypeid = row.roleTypeid;
  this.RoledataUpdate.lastModifier = row.lastModifier;
  }

  DeleteRole(row:any){
    console.log();
    if (window.confirm("Do you really want to delete?"))
    {this.resto.DeleteRoleMasterData(row.id,1).subscribe(
      (res) => {
        console.log(res);
        this.GetRoleMasterData();
      },
      (err) => {
        console.log(err);
      }
    )}
  }

  ActiveRole(row:any){

  }

  UpdatedRoleData(data:any){
    console.log("update data",data);
    this.resto.UpdateRoleMasdterData(data).subscribe(
      (res) => {
        console.log(res);
        
        alert("data has been updated./")
      },
      (err) => {
        console.log(err);
      }
    )
    this.GetRoleMasterData();
  }

}
