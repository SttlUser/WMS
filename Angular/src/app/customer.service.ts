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
  //delete role master data
  public DeleteRoleMasterData(id:any, deletbyid:any, flag:any): Observable<any> {
    console.log(deletbyid,id );
    const para=[deletbyid, id, flag];
    return this.http.post(this.Dispaly_url + 'RoleMater/DeleteRoleMaster',para);
  }
  ///update role master data
  public UpdateRoleMasdterData(data:any): Observable<any> {
    return this.http.put(this.Dispaly_url+'RoleMater/UpdateRoleMaster',data);
  }

//display company data 
  public GetCompanyData():Observable<any>{
    return this.http.get(this.Dispaly_url+'CompanyMaster/GetCompanyDetails');
  }

  //Company registration
  public postRegisterCompany(data: any,header: any): Observable<any>{
    return this.http.post(this.Dispaly_url+'CompanyMaster/RegisterCompany2',data,{ headers: header });
  }

  public postUpdateCompany(data: any,header: any): Observable<any>{
    return this.http.post(this.Dispaly_url+'CompanyMaster/UpdateCompanyDetail',data,{ headers: header });
  }
  
  public DeleteCompanyData(flag: any, lastmodifiedby:any , comp_id:any): Observable<any> {
    const obj=[flag, lastmodifiedby, comp_id]
    // console.log(obj);
    return this.http.post(this.Dispaly_url +'CompanyMaster/DeleteCompanyDb',obj);
  }

  public ActivateCompanyData(flag: any, lastmodifiedby:any , comp_id:any): Observable<any> {
    const obj=[flag, lastmodifiedby, comp_id]
    return this.http.post(this.Dispaly_url +'CompanyMaster/DeleteCompanyDb',obj);
  }


  public GetComapnyDataById(id:Number): Observable<any>{
    return this.http.get(this.Dispaly_url+'CompanyMaster/GetCompanyDataById?id=' + id);
  }


  private myObject: any;

  setObject(obj: any) {
    this.myObject = obj;
  }

  getObject() {
    return this.myObject;
  }

  ////// role access get api
  public GetRoleAccessData(): Observable<any>{
    return this.http.get(this.Dispaly_url+'RoleBasedAccess/GetRoleBasedAccessData');
  }

  /////RoleEditacess post Api
  public PostRoleAccessData(roleid:any,documentid:any):Observable<any> {
    console.log("post id",roleid)
    const requestBody = {
      roleid: roleid,
      Documentid: documentid
    };
    return this.http.post(this.Dispaly_url+'RoleBasedAccess/UpdateRoleAccessData',requestBody);
  }


}





