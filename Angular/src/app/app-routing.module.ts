import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { UsermasterComponent } from './components/usermaster/usermaster.component';
import { EditUsermasterComponent } from './components/edit-usermaster/edit-usermaster.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { DispalyDataComponent } from './components/dispaly-data/dispaly-data.component';
import { RoleMasterComponent } from './components/roleMaster/roleMaster.component';
import { RegisterCompanyComponent } from './components/register-company/register-company.component';
import { CompanyDataDisplayComponent } from './components/company-data-display/company-data-display.component';
import { EditRegisterCompanyComponent } from './components/edit-register-company/edit-register-company.component'

import { RoleAcessListComponent } from './components/RoleAccess/ListingOfData/role-acess-list/role-acess-list.component';
import { EditRoleAccessComponent } from './components/RoleAccess/EditRoleAccess/edit-role-access/edit-role-access.component'
import { NavigationComponent } from './components/navigation/navigation.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: NavigationComponent,
    children: [
      { path: '', component: HomeComponent },

    ],
  },
  {
    path: '',
    component: NavigationComponent,
    children: [
      { path: 'AddRoleMaster', component: RoleMasterComponent },
    ],
  },
  {
    path: '',
    component: NavigationComponent,
    children: [
      { path: 'DispayRoleMaster', component: DispalyDataComponent },
    ],
  },
  {
    path: '',
    component: NavigationComponent,
    children: [
      { path: 'UserMaster', component: UsermasterComponent },
    ],
  },
  {
    path: '',
    component: NavigationComponent,
    children: [
      { path: 'edit-usermaster', component: EditUsermasterComponent },
    ],
  },
  {
    path: '',
    component: NavigationComponent,
    children: [
      { path: 'RegisterCompany', component: RegisterCompanyComponent },
    ],
  },
  {
    path: '',
    component: NavigationComponent,
    children: [
      { path: 'DisplayCompany', component: CompanyDataDisplayComponent },
    ],
  },
  {
    path: '',
    component: NavigationComponent,
    children: [
      { path: 'AddUser', component: CreateUserComponent },
    ],
  },
  {
    path: '',
    component: NavigationComponent,
    children: [
      { path: 'RoleAccessList', component: RoleAcessListComponent },
    ],
  },
  {
    path: '',
    component: NavigationComponent,
    children: [
      { path: 'EditRoleAccess', component: EditRoleAccessComponent },
    ],
  },
  {
    path: '',
    component: NavigationComponent,
    children: [
      { path: 'EditRegisteredCompany', component: EditRegisterCompanyComponent },
    ],
  },

  { path: '**', redirectTo: '' },
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
