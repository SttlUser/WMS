import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RoleMasterComponent } from './components/roleMaster/roleMaster.component';
import{ DispalyDataComponent } from './components/dispaly-data/dispaly-data.component'
import { HomeComponent } from './components/home/home.component';
import{UsermasterComponent} from './components/usermaster/usermaster.component';
import{EditUsermasterComponent} from './components/edit-usermaster/edit-usermaster.component';
import{CreateUserComponent} from './components/create-user/create-user.component';
import {RoleAcessListComponent} from './components/RoleAccess/ListingOfData/role-acess-list/role-acess-list.component';
import {EditRoleAccessComponent} from './components/RoleAccess/EditRoleAccess/edit-role-access/edit-role-access.component'
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  // { path: '',( err?.code === 0) ? (redirectTo: `${err?.code === 0 ? '' : "/login"}`, pathMatch: 'full'): null },
  { path: '', component: HomeComponent },
  { path: 'AddRoleMaster', component: RoleMasterComponent },
  {path:'DispayRoleMaster',component:DispalyDataComponent },
  {path:'UserMaster',component:UsermasterComponent},
  {path:'edit-usermaster',component:EditUsermasterComponent},
  {path:'AddUser',component:CreateUserComponent},
  {path :'RoleAccessList',component:RoleAcessListComponent},
  {path : 'EditRoleAccess',component:EditRoleAccessComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
