import { CommonModule } from '@angular/common';
import { Component, NgModule, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from '../../customer.service'

@Component({
  selector: 'app-edit-usermaster',
  templateUrl: './edit-usermaster.component.html',
  styleUrls: ['./edit-usermaster.component.css']
  
})

export class EditUsermasterComponent {
  @Input() rowData: any;
 
    applyForm = new FormGroup({
    firstName: new FormControl(''),
    middleName: new FormControl(''),
    lastName: new FormControl(''),
    username: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    role: new FormControl(''),  

  });
  housingService: any;

  constructor( private resto: CustomerService){}
  submitApplication() {
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.middleName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? ''
    );
  }

  UpdateUser(){
    


  }
}
