import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import{UsermasterComponent} from './components/usermaster/usermaster.component';
import{EditUsermasterComponent} from './components/edit-usermaster/edit-usermaster.component';
import{CreateUserComponent} from './components/create-user/create-user.component';
import { DispalyDataComponent } from './components/dispaly-data/dispaly-data.component';
import { RoleMasterComponent } from './components/roleMaster/roleMaster.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  // { path: '',( err?.code === 0) ? (redirectTo: `${err?.code === 0 ? '' : "/login"}`, pathMatch: 'full'): null },
  { path: '', component: HomeComponent },
  { path: 'role-master', component: RoleMasterComponent },
  {path:'dispay-rolemaster-data',component:DispalyDataComponent },
  {path:'usermaster',component:UsermasterComponent},
  {path:'edit-usermaster',component:EditUsermasterComponent},
  {path:'create-user',component:CreateUserComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
