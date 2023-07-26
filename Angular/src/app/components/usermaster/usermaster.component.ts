import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormControl, NgForm, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environment';
import { CustomerService } from '../../customer.service';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt';

@Component({
  selector: 'app-usermaster',
  templateUrl: './usermaster.component.html',
  styleUrls: ['./usermaster.component.css'],
})
export class UsermasterComponent {
  @Input() data: any[] = [];
  @Output() editRowEvent = new EventEmitter<any>();

  UserdataUpdate = {
    cb_pk_id: Number,
    Firstname: '',
    Lastname: '',
    Email: '',
    Phone: '',
    ins_del_id: '',
    Password: '',
    roleName: '',
    lastModifier: Number
  };

  ngForm = new FormGroup({
    cb_pk_id: new FormControl('1'),
    firstname: new FormControl(''),
    middlename: new FormControl(''),
    lastname: new FormControl(''),
    username: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    ins_del_id: new FormControl('Default'),
    roleName: new FormControl(''),
  });

  Userdata: any;
  Editdata: any;
  items: any = [];
  loggedInId: any;

  url: string = `${environment.api.server}/RoleMater/GetRoleMasterData`;

  constructor(
    private router: Router,
    private resto: CustomerService,
    public http: HttpClient
  ) {
    const err = JSON.parse(localStorage.getItem('error') || '{}');
    if (err.code !== 0) {
      console.log('Error', err);
      this.router.navigate(['/login']);
      // console.log(this.data);
    }
    this.loggedInId = sessionStorage.getItem('loggedInId');
    this.GetUserDetail();
    this.Getdata(http);
  }

  GetUserDetail() {
    console.log('receving table data');
    this.resto.getdata().subscribe(
      (response: any) => {
        console.log('receved table data', response);
        this.Userdata = response;
        this.initializeDataTable();
      },
      (error) => {
        console.error('Error retrieving data:', error);
      }
    );
  }

  updateForm() {
    this.router.navigate(['/create-user']);
  }
  navigationExtras: NavigationExtras = {
    state: {
      data: this.UserdataUpdate,
    },
  };

  UpdateUser(row: any) {
    console.log(row)
    this.UserdataUpdate.cb_pk_id = row.id;
    this.UserdataUpdate.Firstname = row.firstName;
    this.UserdataUpdate.Lastname = row.lastName;
    this.UserdataUpdate.Email = row.email;
    this.UserdataUpdate.Phone = row.phone;
    this.UserdataUpdate.ins_del_id = row.roleId;
    this.UserdataUpdate.Password = row.password;
    this.UserdataUpdate.roleName = row.roleName;
    this.UserdataUpdate.lastModifier = this.loggedInId
    console.log(this.UserdataUpdate)
  }
  initializeDataTable() {
    $(document).ready(() => {
      $('#myTable').DataTable();
    });
  }

  PostUpdateUserData(UpdateUser: any) {
    if (
      !UpdateUser.Email ||
      !UpdateUser.FirstName ||
      !UpdateUser.Lastname ||
      !UpdateUser.Password ||
      !UpdateUser.Phone ||
      !UpdateUser.cb_pk_id ||
      !UpdateUser.roleName 
    ) {
      alert("Some fields are empty.");
    } 

    if(UpdateUser.ins_del_id =='Default'){
      alert("Select roletype");
    }    
    else{
      console.log(UpdateUser);
      this.resto.UpdateUserData(UpdateUser).subscribe(
        (res) => {
          console.log(res);
          alert('data has been updated');
          this.GetUserDetail()
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  deletebtn(usr: any) {
    if (window.confirm('Do you really want to delete?')) {
      this.resto.DeletUserData(1, usr.id, 4).subscribe(
        (res) => {
          console.log(res);
          this.GetUserDetail();
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  activebtn(usr: any) {
    this.resto.DeletUserData(1, usr.id, 5).subscribe(
      (res) => {
        console.log(res);
        this.GetUserDetail();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  addNewUserMaster() {
    this.router.navigate(['/AddUser']);
  }

  Getdata(http: HttpClient) {
    http.get(this.url).subscribe((res: any) => {
      console.log(res)
      this.items = res;
      return this.items;
    });
  }
}
