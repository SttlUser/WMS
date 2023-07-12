import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {CustomerService} from '../../customer.service'
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment';
import { ToastService } from '../toast/toast.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {
  isLoggedIn: boolean = true;
  message = "USER CREATED SUCCESSFULLY";
  items:any=[];
  url:string=`${environment.api.server}/RoleMater/GetRoleMasterData?id=`+1;
  constructor(private resto:CustomerService, private router: Router ,public http:HttpClient,private toastService: ToastService){
    this.Getdata(http);
  }
  applyForm = new FormGroup({
    cb_pk_id:new FormControl('1'),
    firstname: new FormControl(''),
    middlename: new FormControl(''),
    lastname: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    ins_del_id: new FormControl('1'),  
  });

  Getdata(http:HttpClient){
    http.get(this.url).subscribe((res: any) => {
      this.items = res;
      return this.items
    })
}
  PostUserData(){
    const formData = { ...this.applyForm.value };
    console.log(formData);
    this.resto.PostUserData(formData).subscribe(
    (res)=>{
    console.log(res);  
    this.toastService.recieve(this.message);
    this.router.navigate(['/UserMaster']);
    },
    (err)=>{
      console.log(err);
    }
    )
    // if (formData. && formData.roleid !== undefined) {
    //   // formData.roleid = parseInt(formData.roleid , 10);

    //   this.resto.postdata(formData).subscribe((data) => {
    //     console.log("get data", data);
    //   });
    // }
  }

}
