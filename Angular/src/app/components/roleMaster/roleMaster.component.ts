import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { CustomerService } from '../../customer.service';
import { ToastService } from '../toast/toast.service';
import { ToastComponent } from '../toast/toast.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';

//import { FormGroup, FormBuilder, Validators,AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-role-master',
  templateUrl: './roleMaster.component.html',
  styleUrls: ['./roleMaster.component.css'],
})
export class RoleMasterComponent {
  isLoggedIn: boolean = true;
  ngForm = new FormGroup({
    name: new FormControl(''),
    roleid: new FormControl('Default'),
  });

  error_login = 'SOMETHING WENT WRONG';
  message = 'ROLE CREATED SUCCESSFULLY';
  items: any = [];
  url: string = `${environment.api.server}/RoleMater/GetRoleTypes`;
  url2: string = `${environment.api.server}/RoleMater/CreateRole`;
  showNavbar: boolean = true;
  loggedInId: any
  constructor(
    private router: Router,
    http: HttpClient,
    private resto: CustomerService,
    private toastService: ToastService,
    private snackBar: MatSnackBar
  ) {

    this.Getdata(http);
    this.loggedInId = sessionStorage.getItem('loggedInId');
    //for navbar hiding
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        if (val.url == '/roleMaster') {
          this.showNavbar = true;
        }
      }
    });
  }

  Getdata(http: HttpClient) {
    http.get(this.url).subscribe((res: any) => {
      this.items = res;
      return this.items;
    });
  }



  PostDataForm() {
    const formData = { ...this.ngForm.value , createdBy: this.loggedInId};
    console.log(formData)

    const name = formData.name?.trim();
    const roleid = formData.roleid;

    if (!name) {
      console.log('Rolename and roletype must not be empty.');
      alert('Please enter Role Name');
      return;
    }
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (typeof name !== 'string' || !nameRegex.test(name)) {
      alert('Rolename should not contain special characters or number.');
      return;
    }

    if (roleid == 'Default') {
      console.log('Rolename and roletype must not be empty.');
      alert('Please select valid type');
      return;
    } else {
      console.log(formData)
      
      this.resto.postdata(formData).subscribe((data) => {
        alert('data saved');
        console.log('get data', data);
        const message = 'Role Created Successfully';
        this.snackBar.openFromComponent(ToastComponent, {
          data: { message },
          duration: 2000, // Toast duration in milliseconds
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
        this.router.navigate(['/DispayRoleMaster']);
      });
    }
  }
}
