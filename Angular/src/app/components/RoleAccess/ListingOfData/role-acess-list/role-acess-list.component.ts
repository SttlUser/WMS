import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CustomerService } from '../../../../customer.service'

@Component({
  selector: 'app-role-acess-list',
  templateUrl: './role-acess-list.component.html',
  styleUrls: ['./role-acess-list.component.css']
})
export class RoleAcessListComponent {
  isLoggedIn: boolean = true;
  RoleData:any;
  showNavbar: boolean=true;
  
  
  constructor(private router: Router,private resto: CustomerService,public http:HttpClient){
    
    this.GetRoleMasterData();
    const err = JSON.parse(localStorage.getItem('error') || '{}');
    if (err.code !== 0) {
      console.log("Error", err);
      this.router.navigate(['/role-acess-list']);
      // console.log(this.data);
    }

        //for navbar hiding
        router.events.subscribe(
          (val)=>{
            if(val instanceof NavigationEnd){
              if(val.url=='/login'){
                this.showNavbar=true;
              }
            }
          }
        )
  }
  

  GetRoleMasterData(){
    console.log("receving table data");
    this.resto.getRoleMaster().subscribe(
      (response: any) => {
        console.log("receved table data", response);
        this.RoleData = response;
      },
      (error) => {
        console.error('Error retrieving data:', error);
      }
    );
  }


  Editpage(rol:any){
     
    // console.log(this.RoleData.id);
    
    this.navigateToComponentWithId(rol.id);
    console.log(rol.id);
  }

  navigateToComponentWithId(id: number) {
    let role_id = this.RoleData.id;
    // console.log(id);
    this.router.navigate([`/EditRoleAccess`],{ queryParams: { id: id } });
  }
}