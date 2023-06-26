import { Injectable } from '@angular/core';
import { environment } from 'src/environment';
import { HttpClient } from '@angular/common/http';
import {FormBuilder, FormControl,FormGroup, NgForm} from '@angular/forms'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  posturl=`${environment.api.server}/RoleMater/CreateRole`;
  Dispaly_url=`${environment.api.server}/`;
  constructor(private http:HttpClient) {}
  postdata(data: any){
    return this.http.post(this.posturl,data);
  } 

  // public DisplayData(){
  //   return this.http.get(this.)
  // }

  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(`Homes application received: firstName: ${firstName}, lastName: ${lastName}, email: ${email}.`);
  }

  public getdata():Observable<any>{
    return this.http.get(this.Dispaly_url+'UserMaster/GetUserMasterData');      
  }

  public DeletUserData(num:any,id:any){
    console.log(num,id);
    // const usr = [id, num]
    const usr = [num, id]
    return this.http.post(this.Dispaly_url+'UserMaster/DeleteUserMaster',usr);
  }

  public UpdateUserData(data:any){
    return this.http.put(this.Dispaly_url+'UserMaster/UpdateUserMaster',data)
  }

  public getdatabyid(id:any){
    return this.http.get(this.Dispaly_url+'UserMaster/GetUserById?id='+id);      
  }

  public PostUserData(data:any){
    return this.http.post(this.Dispaly_url+'UserMaster/CreateUser',data);
  }

  // public getRoleMasterId(){
  //   return this.http.get(this.Dispaly_url+'/');
  // }
}
