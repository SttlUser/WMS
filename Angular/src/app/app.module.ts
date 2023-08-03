import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { RoleMasterComponent } from './components/roleMaster/roleMaster.component';
import {CustomerService} from './customer.service';
import { CommonModule } from '@angular/common';
import { DispalyDataComponent } from './components/dispaly-data/dispaly-data.component';
import { HomeComponent } from './components/home/home.component';
import { EditUsermasterComponent } from './components/edit-usermaster/edit-usermaster.component';
import { UsermasterComponent } from './components/usermaster/usermaster.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { RegisterCompanyComponent } from './components/register-company/register-company.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CompanyDataDisplayComponent } from './components/company-data-display/company-data-display.component';
import { EditRegisterCompanyComponent } from './components/edit-register-company/edit-register-company.component';
import { RoleAcessListComponent } from './components/RoleAccess/ListingOfData/role-acess-list/role-acess-list.component';
import { EditRoleAccessComponent } from './components/RoleAccess/EditRoleAccess/edit-role-access/edit-role-access.component';

import { CapitalizePipe } from './capitalize.pipe';
import { MAT_SNACK_BAR_DATA, MatSnackBarModule } from '@angular/material/snack-bar';
import { LayoutComponent } from './layout/layout.component';
import { DataService } from './data.service';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; // Import the MatProgressSpinnerModule






@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavigationComponent,
    RoleMasterComponent,
    DispalyDataComponent,
    HomeComponent,
    UsermasterComponent,
    EditUsermasterComponent,
    CreateUserComponent,
    RegisterCompanyComponent,
    CompanyDataDisplayComponent,
    EditRegisterCompanyComponent,
    RoleAcessListComponent,
    EditRoleAccessComponent,
    CapitalizePipe,
    LayoutComponent,
    ChangePasswordComponent,
    ForgetPasswordComponent
      
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { 
 
}
