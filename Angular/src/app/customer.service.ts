import { Injectable } from '@angular/core';
import { environment } from 'src/environment';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms'
import { Observable, map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  Dispaly_url = `${environment.api.server}/`;
  constructor(private http: HttpClient) { }
  //post role ,master data
  postdata(data: any) {
    return this.http.post(this.Dispaly_url+'RoleMater/CreateRole', data);
  }

  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(`Homes application received: firstName: ${firstName}, lastName: ${lastName}, email: ${email}.`);
  }

  public getdata(): Observable<any> {
    return this.http.get(this.Dispaly_url + 'UserMaster/GetUserMasterData');
  }

  public DeletUserData(num: any, id: any, flag: any) {
    console.log(num, id);
    const usr = [num, id, flag];
    return this.http.post(this.Dispaly_url + 'UserMaster/DeleteUserMaster', usr);
  }

  public UpdateUserData(data: any) {
    return this.http.put(this.Dispaly_url + 'UserMaster/UpdateUserMaster', data)
  }

  public getdatabyid(id: any) {
    return this.http.get(this.Dispaly_url + 'UserMaster/GetUserById?id=' + id);
  }

  public PostUserData(data: any) {
    return this.http.post(this.Dispaly_url + 'UserMaster/CreateUser', data);
  }
  ///diplay data
  public getRoleMaster(): Observable<any> {
    return this.http.get(this.Dispaly_url + 'RoleMater/GetRoleMasterData');
  }
  //delet role master data
  public DeleteRoleMasterData(id:any,deletbyid:any,flag:any): Observable<any> {
    const para=[id,deletbyid,4];
    return this.http.post(this.Dispaly_url + 'RoleMater/DeleteRoleMaster',para);
  }
  ///update role master data
  public UpdateRoleMasdterData(data:any): Observable<any> {
    return this.http.put(this.Dispaly_url+'RoleMater/UpdateRoleMaster',data);
  }

}
