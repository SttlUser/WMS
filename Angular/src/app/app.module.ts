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
    EditRegisterCompanyComponent
    
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
  ],
  providers: [CustomerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
