import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environment';
import { CustomerService } from '../../customer.service';

import { MatSnackBar } from '@angular/material/snack-bar';

import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt';
@Component({
  selector: 'app-dispaly-data',
  templateUrl: './dispaly-data.component.html',
  styleUrls: ['./dispaly-data.component.css'],
})
export class DispalyDataComponent {
  isLoggedIn: boolean = true;
  updade = 'UPDATE API SUCCESS';
  activate = 'Activate API SUCCESS';
  myString: any;
  message: any;
  RoleData: any;
  items: any = [];
  loggedInId: any;

  RoledataUpdate = {
    id: '',
    name: '',
    roleTypeid: '',
    createdDate: '',
    lastModifier: '',
    roleTypeName: '',
  };

  ngForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    roletype: new FormControl('Default'),
    lastModifier: new FormControl(''),
  });

  url: string = `${environment.api.server}/RoleMater/GetRoleTypes`;
  toastComponent: any;
  showNavbar: boolean = true;
  constructor(
    private router: Router,
    private resto: CustomerService,
    public http: HttpClient,
   
    private snackBar: MatSnackBar
  ) {
    const err = JSON.parse(localStorage.getItem('error') || '{}');
    if (err.code !== 0) {
      console.log('Error', err);
      this.router.navigate(['/login']);
    }
    //for navbar hiding
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        if (val.url == '/login') {
          this.showNavbar = true;
        }
      }
    });
    this.loggedInId = sessionStorage.getItem('loggedInId');
    this.Getdata(http);
    this.GetRoleMasterData();
  }
  GotoRoleMaster() {
    this.router.navigate(['/AddRoleMaster']);
  }

  GetRoleMasterData() {
    console.log("receving table data");
    this.resto.getRoleMaster(1).subscribe(
      (response: any) => {
        console.log('receved table data', response);
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
      return this.items;
    });
  }

  initializeDataTable() {
    $(document).ready(() => {
      $('#myTable').DataTable({
        scrollX:true,
        autoWidth:true,
        retrieve: true,
        paging: false,
        order: [[ 2, "desc" ]]
      });
    });
  }
  

  UpdateRole(RoleData: any) {
    this.RoledataUpdate.id = RoleData.id;
    this.RoledataUpdate.name = RoleData.name;
    this.RoledataUpdate.roleTypeid = RoleData.roleTypeid;
    this.RoledataUpdate.lastModifier = this.loggedInId;
  }

  DeleteRole(rol: any) {
    console.log(rol);
    if (window.confirm('Do you really want to delete?')) {
      console.log(rol);
      this.resto.DeleteRoleMasterData(rol.id, this.loggedInId, 4).subscribe(
        (res) => {
          console.log(res);
          this.GetRoleMasterData();
        
          // this.toastService.recieve(this.activate);
          // this.toastService.showSuccessToast('API call was successful!');
        },
        (err) => {
          console.log(err);
          // this.toastService.showError('API call was unsuccessful!');
        
        }
      );
    } else {
      return;
    }
  }

  ActiveRole(rol: any) {
    if (window.confirm('Do you really want to Activate?')) {
      console.log(rol);
      this.resto.DeleteRoleMasterData(rol.id, this.loggedInId, 5).subscribe(
        (res) => {
          console.log(res);
          this.GetRoleMasterData();
          // this.toastService.recieve(this.activate);
          // this.toastService.showSuccessToast('API call was successful!');
        },
        (err) => {
          console.log(err);
          // this.toastService.showError('API call was unsuccessful!');
         
        }
      );
    } else {
      return;
    }
  }

  UpdatedRoleData(UpdateRole: any) {
    console.log('update data', UpdateRole);

    if (
      !UpdateRole.RoleTypeid ||
      !UpdateRole.id ||
      !UpdateRole.lastModifier ||
      !UpdateRole.name
    ) {
      alert('Some fields are empty.');
    }

    if (UpdateRole.RoleTypeid == 'Default') {
      alert('Select roletype');
    } else {
      this.resto.UpdateRoleMasdterData(UpdateRole).subscribe(
        (res) => {
          alert('Role updated');
          // this.toastService.recieve(this.updade);
         
          console.log(res, 'Role Updated Successfully');
          this.GetRoleMasterData();
        },
        (err) => {
          console.log(err);
         
        }
      );
    }
  }
}
