import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environment';
import { CustomerService } from '../../customer.service';
import { ToastService } from '../toast/toast.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastComponent } from '../toast/toast.component';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt';
  
@Component({
  selector: 'app-dispaly-data',
  templateUrl: './dispaly-data.component.html',
  styleUrls: ['./dispaly-data.component.css']
})
export class DispalyDataComponent {
  isLoggedIn: boolean = true;
  updade = "UPDATE API SUCCESS";
  activate = "Activate API SUCCESS";
  myString: any;
message:any;
  RoleData: any;
  items: any = [];

  RoledataUpdate = {
    id: "",
    name: "",
    roleTypeid: "",
    createdDate: "",
    lastModifier: "",
    roleTypeName: "",
  }

  ngForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    roletype: new FormControl(''),
    lastModifier: new FormControl('1')
  });


  url: string = `${environment.api.server}/RoleMater/GetRoleTypes`;
  toastComponent: any;
  showNavbar: boolean = true;
  constructor(private router: Router, private resto: CustomerService, public http: HttpClient,private toastService: ToastService,private snackBar: MatSnackBar ) {
    this.Getdata(http);
    const err = JSON.parse(localStorage.getItem('error') || '{}');
    if (err.code !== 0) {
      console.log("Error", err);
      this.router.navigate(['/login']);
    }
    
    
    //for navbar hiding
    router.events.subscribe(
      (val)=>{
        if(val instanceof NavigationEnd){
          if(val.url=='/login'){
            this.showNavbar=true;
          }
        }
      }
      )
      
      this.GetRoleMasterData();
    
  }
  GotoRoleMaster() {
    
    this.router.navigate(['/AddRoleMaster'])
  }

  GetRoleMasterData() {
    console.log("receving table data");
    this.resto.getRoleMaster().subscribe(
      (response: any) => {
        console.log("receved table data", response);
        this.RoleData = response;
        this.initializeDataTable();
      },
      (error) => {
        console.error('Error retrieving data:', error);
      }
    );
  }

  Getdata(http: HttpClient) {
    http.get(this.url).subscribe((res: any) => {
      this.items = res;
      console.log(this.items);
      return this.items
    })
  }
  
  initializeDataTable() {
    $(document).ready(() => {
      $('#myTable').DataTable();
    });
  }

  UpdateRole(RoleData: any) {
    this.RoledataUpdate.id = RoleData.id;
    this.RoledataUpdate.name = RoleData.name;
    this.RoledataUpdate.roleTypeid = RoleData.roleTypeid;
    this.RoledataUpdate.lastModifier = RoleData.lastModifier;
  }

  DeleteRole(rol: any) {
    console.log(rol);
    if (window.confirm("Do you really want to delete?")) {
      this.resto.DeleteRoleMasterData( rol.id, 42, 4).subscribe(
        (res) => {
          // this.toast.success({detail:"Success Message",summary:res.Message,duration:5000})
          // this.toastService.toast(message);
         
          console.log(res);
          this.GetRoleMasterData();
          const message = 'Role Deleted Successfully';
      this.snackBar.openFromComponent(ToastComponent, {
      data: { message },
      duration: 2000, // Toast duration in milliseconds
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });

          // this.sendString(this.message);
          
        },
        (err) => {
          // this.toastService.showError('API call was unsuccessful!');
         
          console.log(err);
        }
      )
    }
  }

  ActiveRole(rol: any) {
    if (window.confirm("Do you really want to Activate?")){

      console.log(rol);
    this.resto.DeleteRoleMasterData(rol.id, 42, 5).subscribe(
      (res) => {
        console.log(res);
        this.GetRoleMasterData();
        const message = 'Role Activated Successfully';
        this.snackBar.openFromComponent(ToastComponent, {
          data: { message },
          duration: 2000, // Toast duration in milliseconds
          horizontalPosition: 'end',
          verticalPosition: 'top'
        });
        // this.toastService.recieve(this.activate);
        // this.toastService.showSuccessToast('API call was successful!');
      },
      (err) => {
        console.log(err);
        // this.toastService.showError('API call was unsuccessful!');
      }
    )
    }
  }

  UpdatedRoleData(UpdateRole: any) {
    console.log("update data", UpdateRole);
    this.resto.UpdateRoleMasdterData(UpdateRole).subscribe(
      (res) => {
        console.log(res);
        // this.toastService.recieve(this.updade);
        // alert("data has been updated./")
      },
      (err) => {
        console.log(err);
      }
    )
    this.GetRoleMasterData();
    const message = 'Role Updated Successfully';
    this.snackBar.openFromComponent(ToastComponent, {
      data: { message },
      duration: 2000, // Toast duration in milliseconds
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });
  }

  // sendString(myString:any){
  //   myString = "DELETE API SUCCESS";
    
  //  this.toastService.recieve(myString);
  // }
  

}




