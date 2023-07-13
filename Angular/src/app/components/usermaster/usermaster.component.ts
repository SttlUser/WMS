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
    const formData = { ...this.ngForm.value };
    const ins_del_id = formData.ins_del_id ?? '';
    if (!this.UserdataUpdate.Firstname || !this.UserdataUpdate.Lastname || !this.UserdataUpdate.Email || 
      !this.UserdataUpdate.Password || !this.UserdataUpdate.Phone ) {
        if(this.UserdataUpdate.ins_del_id = ""){
      console.log("All fields are required");
      alert("All fields are required, Please fill in it");
      return;
        }
    }
    
    // if (this.UserdataUpdate.ins_del_id === 'select' || this.UserdataUpdate.ins_del_id==='default' ) {
    //   console.log('Please select a role.');
    //   alert('Please select a role.');
    //   return;
    // }
    
    if (!UpdateUser.Firstname) {
      console.log("Firstname is required");
      alert("Firstname is required")
      return;
    }
  
    // Validating lastname
    if (!UpdateUser.Lastname) {
      console.log("Lastname is required");
      return;
    }
  
    // Validating email
    if (!UpdateUser.Email) {
      console.log("Email is required");
      return;
    } else if (!this.isValidEmail(UpdateUser.Email)) {
      console.log("Invalid email format");
      return;
    }
//     this.isValidEmail(email: string) {
//   // Email validation regular expression with specific domain
//   const emailRegex = /^[A-Za-z0-9._%+-]+@example\.com$/;
//   return emailRegex.test(Email);
// }
  
    // Validating password
    if (!UpdateUser.Password) {
      console.log("Password is required");
      return;
    } else if (!this.isValidPassword(UpdateUser.Password)) {
      console.log("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character");
      return;
    }
  
    // Validating phone
    if (!UpdateUser.Phone) {
      console.log("Phone is required");
      return;
    } else if (!this.isValidPhone(UpdateUser.Phone)) {
      console.log("Invalid phone number format");
      return;
    };
    
    console.log(UpdateUser);
    // this.resto.UpdateUserData(UpdateUser).subscribe(
    //   (res) => {
    //     console.log(res);
    //     alert("data has been updated./")
    //   },
    //   (err) => {
    //     console.log(err);
    //   }
    // )
  }
  isCapitalized(value: string) {
    
    return /^[A-Z]/.test(value);
  }
   isValidEmail(Email: string) {
    
    const emailPattern =/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    
    
    return emailPattern.test(Email);
  }
  
   isValidPassword(Password: string) {
    // Password validation regex pattern
    const passwordPattern =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordPattern.test(Password);
  }
  
   isValidPhone(Phone: string) {
    const phonePattern = /^[0-9]\d{9}$/; 
    return phonePattern.test(Phone);
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


