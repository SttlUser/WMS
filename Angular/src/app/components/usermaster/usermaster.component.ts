import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router'
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environment';
import { CustomerService } from '../../customer.service'



@Component({
  selector: 'app-usermaster',
  templateUrl: './usermaster.component.html',
  styleUrls: ['./usermaster.component.css']
})

export class UsermasterComponent {

  
  @Input() data: any[] = [];
  @Output() editRowEvent = new EventEmitter<any>();



  UserdataUpdate = {
    cb_pk_id: Number,
    Firstname: "",
    Lastname: "",
    Email: "",
    Phone: "",
    ins_del_id: "",
    Password: "",
    roleName:""
  }

  ngForm = new FormGroup({
    cb_pk_id: new FormControl('1'),
    firstname: new FormControl(''),
    middlename: new FormControl(''),
    lastname: new FormControl(''),
    username: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    ins_del_id: new FormControl(''),
    roleName:new FormControl('')
  });

  Userdata: any;
  Editdata: any;
  items: any = [];

  url: string = `${environment.api.server}/RoleMater/GetRoleMasterData`;

  constructor(private router: Router, private resto: CustomerService, public http: HttpClient) {
    this.GetUserDetail();
    this.Getdata(http);
    const err = JSON.parse(localStorage.getItem('error') || '{}');
    if (err.code !== 0) {
      console.log("Error", err);
      this.router.navigate(['/login']);
      // console.log(this.data);
    }
  }



  GetUserDetail() {
    console.log("receving table data");
    this.resto.getdata().subscribe(
      (response: any) => {
        console.log("receved table data", response);
        this.Userdata = response;
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
      data: this.UserdataUpdate
    }
  };

  UpdateUser(row: any) {
    this.UserdataUpdate.cb_pk_id = row.id;
    this.UserdataUpdate.Firstname = row.firstName;
    this.UserdataUpdate.Lastname = row.lastName;
    this.UserdataUpdate.Email = row.email;
    this.UserdataUpdate.Phone = row.phone;
    this.UserdataUpdate.ins_del_id = row.ins_del_id;
    this.UserdataUpdate.Password = row.password;
    this.UserdataUpdate.roleName = row.roleName;
  }

  PostUpdateUserData(UpdateUser: any) {
    console.log(UpdateUser);
    this.resto.UpdateUserData(UpdateUser).subscribe(
      (res) => {
        console.log(res);
        alert("data has been updated./")
      },
      (err) => {
        console.log(err);
      }
    )
  }

  deletebtn(usr: any) {
    if (window.confirm("Do you really want to delete?")) {
      this.resto.DeletUserData(1, usr.id, 4).subscribe(
        (res) => {
          console.log(res);
          this.GetUserDetail();
        },
        (err) => {
          console.log(err);
        }
      )
    }

    // this.resto.DeletUserData(1, usr.id, 4).subscribe(
    //   (res) => {
    //     console.log(res);
    //     this.GetUserDetail();
    //   },
    //   (err) => {
    //     console.log(err);c
    //   }
    // )

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
    )
  }

  addNewUserMaster() {
    this.router.navigate(['/create-user'])
  }

  Getdata(http: HttpClient) {
    http.get(this.url).subscribe((res: any) => {
      this.items = res;
      return this.items
    });
  }
 

}


