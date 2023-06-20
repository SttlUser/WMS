import { Injectable } from '@angular/core';
import { environment } from 'src/environment';
import { HttpClient } from '@angular/common/http';
import {FormBuilder, FormControl,FormGroup, NgForm} from '@angular/forms'
@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  posturl=`${environment.api.server}/RoleMater/CreateRole`;
  Dispaly_url=`${environment.api.server}/`;
  constructor(private http:HttpClient) {}
  postdata(data: any){
    // console.log(data);
    return this.http.post(this.posturl,data);
  } 

  // public DisplayData(){
  //   return this.http.get(this.)
  // }
}
