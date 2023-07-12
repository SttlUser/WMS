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
import { DispalyDataComponent } from './components/dispaly-data/dispaly-data.component';
import { HomeComponent } from './components/home/home.component';
import { EditUsermasterComponent } from './components/edit-usermaster/edit-usermaster.component';
import { UsermasterComponent } from './components/usermaster/usermaster.component';
import { CommonModule } from '@angular/common';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { RoleAcessListComponent } from './components/RoleAccess/ListingOfData/role-acess-list/role-acess-list.component';
import { EditRoleAccessComponent } from './components/RoleAccess/EditRoleAccess/edit-role-access/edit-role-access.component';
import { ToastComponent } from './components/toast/toast.component';
import { ToastService } from './components/toast/toast.service';
import { CapitalizePipe } from './capitalize.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_SNACK_BAR_DATA, MatSnackBarModule } from '@angular/material/snack-bar';





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
    RoleAcessListComponent,
    EditRoleAccessComponent,
    ToastComponent,
    CapitalizePipe,
    
      
    
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
    MatSnackBarModule
  
    
   
   
  ],
  providers: [CustomerService, ToastService, { provide: MAT_SNACK_BAR_DATA, useValue: {} } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
