import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CustomerService } from 'src/app/customer.service';
import { ToastService } from 'src/app/components/toast/toast.service';
import { ToastComponent } from 'src/app/components/toast/toast.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';


@Component({
  selector: 'app-edit-role-access',
  templateUrl: './edit-role-access.component.html',
  styleUrls: ['./edit-role-access.component.css']
})
export class EditRoleAccessComponent implements OnInit  {
  isLoggedIn: boolean = true;
  @Output() close = new EventEmitter<void>();
  Accessdata:any;
  role_id:any;
  id: any;
  // edit_role_access_posted = "DATA POSTED SUCCESSFULLY"
  checkboxValues: { [key: string]: boolean } = {};
  rbacCheckboxArr: any[] = [];
  Access=[{"id":0,"value":"Full Access"},{"id":1,"value":"No Access"}];
  showNavbar: boolean = true;
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
      //console.log(this.id); // Use the ID as needed
    });}

  constructor(private router: Router,private resto: CustomerService,public http:HttpClient,private route: ActivatedRoute,private toastService: ToastService,private snackBar: MatSnackBar,private location: Location){
    this.GetAccessData(http );
    const err = JSON.parse(localStorage.getItem('error') || '{}');
    if (err.code !== 0) {
      console.log("Error", err);
      this.router.navigate(['/login']);
      // console.log(this.data);
    }

        //for navbar hiding
        router.events.subscribe(
          (val)=>{
            if(val instanceof NavigationEnd){
              if(val.url=='/edit-role-access'){
                this.showNavbar=true;
              }
            }
          }
        )
  }
  



  GetAccessData(http:HttpClient){
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];})
    console.log("functionid",this.id);
    this.resto.GetRoleAccessData(this.id).subscribe(
      (response: any) => {
        console.log("receved table data", response);
        this.Accessdata = response;
      },
      (error) => {
        console.error('Error retrieving data:', error);
        const message = 'Something went wrong.';
        this.snackBar.openFromComponent(ToastComponent, {
          data: { message },
          duration: 2000, // Toast duration in milliseconds
          horizontalPosition: 'end',
          verticalPosition: 'top'
        });
      }
    );
  }

  rbacCheckBox(rol: any) {
    this.role_id = rol.roleid;
    if (rol.checked) {
      this.rbacCheckboxArr.push(rol.documentid);
      console.log('Checked');
      this.checkboxValues[rol.documentid] = true;
  } else {
    const index = this.rbacCheckboxArr.indexOf(rol.documentid);
    this.rbacCheckboxArr.splice(index, 1);
    console.log('UnChecked');
    // Update the state of the checkbox in the checkboxStates array
    this.checkboxValues[rol.documentid] = false;
  }
    console.log(this.rbacCheckboxArr);
  }

   CloseBtn(){
    // this.router.navigate(['/RoleAccessList']);
  this.location.back();
   }

  PostrbacData(){
    console.log("roleid",this.id,this.rbacCheckboxArr);
    this.resto.PostRoleAccessData(this.id,this.rbacCheckboxArr).subscribe(
      (res)=>{
        console.log(this.id,this.rbacCheckboxArr);
        console.log(res);
        const message = 'Data Posted Successfully';
        this.snackBar.openFromComponent(ToastComponent, {
          data: { message },
          duration: 2000, // Toast duration in milliseconds
          horizontalPosition: 'end',
          verticalPosition: 'top'
        });
        // this.toastService.recieve(this.edit_role_access_posted);
        this.router.navigate(['/RoleAccessList'])
      },
      (err)=>{
        console.log(err);
        const message = 'Something went wrong.';
        this.snackBar.openFromComponent(ToastComponent, {
          data: { message },
          duration: 2000, // Toast duration in milliseconds
          horizontalPosition: 'end',
          verticalPosition: 'top'
        });
      }
    )
  }
}
