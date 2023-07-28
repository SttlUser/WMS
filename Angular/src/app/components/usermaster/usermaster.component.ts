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
    //console.log(row)
    this.UserdataUpdate.cb_pk_id = row.id;
    this.UserdataUpdate.Firstname = row.firstName;
    this.UserdataUpdate.Lastname = row.lastName;
    this.UserdataUpdate.Email = row.email;
    this.UserdataUpdate.Phone = row.phone;
    this.UserdataUpdate.ins_del_id = row.roleId;
    this.UserdataUpdate.Password = row.password;
    this.UserdataUpdate.roleName = row.roleName;
   // console.log(this.UserdataUpdate)
  }
  initializeDataTable() {
    $(document).ready(() => {
      $('#myTable').DataTable({
        scrollX:true,
        autoWidth:true,
        retrieve: true,
        paging: false
      });
     
    });
  }

  PostUpdateUserData(data: any) {
    console.log("hello");
    console.log(data);
    const passwordRegex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    
    if (!passwordRegex.test(data.Password)) {
      console.log(
        'Password must contain at least 8 characters including at least one uppercase letter, one lowercase letter, one digit, and one special character.'
        );
        alert(
          'Password must contain at least 8 characters including at least one uppercase letter, one lowercase letter, one digit, and one special character.'
          );
          return;
        }

        
        if (
          !data.Email ||
          !data.Firstname ||
          !data.Lastname ||
          !data.Password ||
          !data.Phone ||
          !data.ins_del_id 
        ) {
          alert("Some fields are empty.");
        } 
        if(data.ins_del_id =='Default'){
          alert("Select roletype");
        }    
        else{
          data.lastModifier = this.loggedInId;
          //console.log(UpdateUser);
          this.resto.UpdateUserData(data).subscribe(
        (res) => {
          //console.log(res);
          alert('Data updated successfully');
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
      this.resto.DeletUserData(this.loggedInId, usr.id, 4).subscribe(
        (res) => {
          console.log(res);
          alert("User Deactivated Successfully")
          this.GetUserDetail();
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  activebtn(usr: any) {
    this.resto.DeletUserData(this.loggedInId, usr.id, 5).subscribe(
      (res) => {
        console.log(res);
        alert("User Activated Successfully")
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
    this.resto.getRoleMaster(6).subscribe((res: any) => {
      console.log(res)
      this.items = res;
      return this.items;
    });
  }
}
