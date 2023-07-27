import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  AbstractControl,
} from '@angular/forms';
import { CustomerService } from 'src/app/customer.service';
import { environment } from 'src/environment';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ToastComponent } from '../toast/toast.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-register-company',
  templateUrl: './edit-register-company.component.html',
  styleUrls: ['./edit-register-company.component.css'],
})
export class EditRegisterCompanyComponent {
  applyForm!: FormGroup;
  activeTab: string = 'registrationTab';
  // dbNamearray: FormArray;
  SLDbName: string[] = [];
  NewList: Sldbname[] = [];
  sapcompanyname: string[] = [];
  objectData: any;
  EditData: any;
  DataTable!: FormArray;

  id: any;

  constructor(
    private formBuilder: FormBuilder,
    private resto: CustomerService,
    public http: HttpClient,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    // this.applyForm = this.formBuilder.group({
    //   dbName: this.formBuilder.array([]),
    // });
    // this.dbNamearray = this.applyForm.get('dbName') as FormArray;
    this.objectData = {};
    this.objectData = this.resto.getObject();
    this.route.queryParams.subscribe((params) => {
      this.id = params['id'];
    });
    this.GetDataById();
  }


  GetDataById() {
    this.resto.GetComapnyDataById(this.id).subscribe(
      (res) => {
        this.applyForm.patchValue(res);
        const tableData = this.applyForm.get('tableData') as FormArray;
        res.dbName.forEach((item : { dbName: string, sapCompanyName: string, flag: string }) => {
          tableData.push(this.createTableRow(item));
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  ngOnInit() {
    this.applyForm = this.formBuilder.group({
      name: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\d+$/),Validators.pattern(/^\d{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      slUrl: ['', Validators.required],
      sldbName: ['', Validators.required],
      slusername: ['', Validators.required,Validators.pattern(/^[0-9]+$/)],
      SLPassword: ['', [Validators.required, Validators.minLength(8),Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).*$/)]],
      tableData: this.formBuilder.array([]),
      putCheckbox: [true],
      ssccCheckbox: [true],
      cartonCheckbox: [true],
      autoCheckbox: [true],
      whsInput: [''],
      DataTable: this.formBuilder.array([]),
    });
    
  }
  
  getTableDataControls(): FormArray {
    return this.applyForm.get('tableData') as FormArray;
  }

  CompanydataUpdate = {
    comp_id: Number,
    name: '',
    createdBy: '',
    createdDate: '',
    db_type: '',
    defaultWarehouseCode: '',
    deletedBy: '',
    deletedDate: '',
    email: '',
    hasAutoBatchConfigurator: '',
    hasCartonNoManagement: '',
    hasPutAwayProc: '',
    hasSsccNoManagement: '',
    id: '',
    isActive: '',
    isDelete: '',
    lastModifiedDate: '',
    lastmodifiedby: '',
    phone: '',
    sapcompanyname: '',
    slDbName: '',
    slPassword: '',
    slUrl: '',
    slusername: '',
  };

  get tableData() {
    return this.applyForm.get('tableData') as FormArray;
  }

  companyDataObj: CompanyData = new CompanyData();
  Sldbnamelistobj: Sldbname = new Sldbname();

  
  createTableRow(item : { dbName: string, sapCompanyName: string, flag: string }): FormGroup {
    return this.formBuilder.group({
      dbName: [item.dbName],
      sapCompanyName: [item.sapCompanyName],
      flag: [item.flag],
    });
  }
  
  addRow() {
    const tableData = this.applyForm.get('tableData') as FormArray;
    tableData.push(this.createTableRow({ dbName: '', sapCompanyName: '' , flag:''}));
  }
  
  
  deleteRow(index: number) {
    const tableData = this.applyForm.get('tableData') as FormArray;
    tableData.removeAt(index);
  }
  clearForm() {
    this.applyForm.reset(); // Reset the form to its initial state
  }
  
  
  
  onSubmit() {
   
   
    





   const phoneControl = this.applyForm.get('phone');
   if (phoneControl && phoneControl.invalid) {
    if (phoneControl.errors?.['required']) {
    alert('Please provide a phone number.');
   } else if (phoneControl.errors?.['pattern']) {
    const phoneNumber = phoneControl.value;
    if (phoneNumber.length !== 10) {
      alert('Please provide a phone number with exactly 10 digits.');
    } else {
      alert('Please provide a valid phone number.\n\nPhone number must contain only numeric digits.');
    }
  }
  return;
}
const emailControl = this.applyForm.get('email');
if (emailControl && emailControl.invalid) {
  alert('Please provide a valid email address.');
  return;
}
const slUsernameControl = this.applyForm.get('slusername');
if (slUsernameControl && slUsernameControl.invalid) {
  if (slUsernameControl.errors?.['required']) {
    alert('Please provide a username.');
  } else if (slUsernameControl.errors?.['pattern']) {
    alert('Please provide a valid username.\n\nUsername must contain only numeric digits.');
  }
  return;
}
const slPasswordControl = this.applyForm.get('SLPassword');
if (slPasswordControl && slPasswordControl.invalid) {
  alert('Please provide a valid password.\n\nPassword must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.');
  return;
}
if (this.isFormFieldsEmpty(this.applyForm)) {
        
  alert('Please fill in all the required fields.');
  return;
}
    // if (this.isFormFieldsEmpty(this.applyForm)) {
    //   // Form is invalid, display an alert or handle the error
    //   alert('Please fill in all the required fields.');
    //   return;
    // }
    // const emailValue = this.applyForm.get('email')?.value;
    // const passwordValue = this.applyForm.get('slPassword')?.value;
    // const phoneValue = this.applyForm.get('phone')?.value;

    // if (!this.validatePhone(phoneValue)) {
    //   // Invalid phone number format, display an alert or handle the error
    //   alert('Please enter a valid phone number.');
    //   return;
    // }
    // if (!this.validateEmail(emailValue)) {
    //   // Invalid email format, display an alert or handle the error
    //   alert('Please enter a valid email address.');
    //   return;
    // }
  
    // if (!this.validatePassword(passwordValue)) {
    //   // Invalid password format, display an alert or handle the error
    //   alert('Please enter a valid password.');
    //   return;
    // }
    this.SLDbName = this.tableData.controls.map(
      (control) => (control as FormGroup).get('dbName')?.value || ''
    );
    this.sapcompanyname = this.tableData.controls.map(
      (control) => (control as FormGroup).get('sapCompanyName')?.value || ''
    );
    for (let i = 0; i < this.SLDbName.length; i++) {
      const sldbname: Sldbname = new Sldbname();
      sldbname.dbName = this.SLDbName[i];
      sldbname.sapCompanyName = this.sapcompanyname[i] || '';
      this.NewList.push(sldbname);
    }
    this.companyDataObj!.id = this.id;
    this.companyDataObj!.Name = this.applyForm.value.name;
    this.companyDataObj!.slUrl = this.applyForm.value.slUrl;
    this.companyDataObj!.slusername = this.applyForm.value.slusername;
    this.companyDataObj!.slPassword = this.applyForm.value.slPassword;
    this.companyDataObj!.phone = this.applyForm.value.phone;
    this.companyDataObj!.email = this.applyForm.value.email;
    this.companyDataObj!.DatabaseType = this.applyForm.value.sldbName;
    this.companyDataObj!.DbName = this.NewList;
    this.companyDataObj!.hasPutAwayProc = this.applyForm.value.putCheckbox;
    this.companyDataObj!.hasSsccNoManagement =
    this.applyForm.value.ssccCheckbox;
    this.companyDataObj!.hasCartonNoManagement =
    this.applyForm.value.cartonCheckbox;
    this.companyDataObj!.defaultWarehouseCode = 1;
    this.companyDataObj!.hasAutoBatchConfigurator =
    this.applyForm.value.autoCheckbox;
    this.companyDataObj!.createdDate = '1-2-3';
    this.companyDataObj!.deletedDate = '1-2-3';
    this.companyDataObj!.lastModifiedDate = '1-2-3';
    this.companyDataObj!.lastmodifiedby = 0;
    this.companyDataObj!.comp_id = this.id;
    this.companyDataObj!.isActive = true;
    this.companyDataObj!.isDelete = false;
    this.companyDataObj!.deletedBy = 0;
    this.companyDataObj!.createdBy = 0;
    this.companyDataObj!.flag = false;
    this.companyDataObj!.SLDBName = '';
    this.companyDataObj!.SAPCompanyName = '';
    
      
    const serializedData: string = JSON.stringify(this.companyDataObj);
    const headers = {
      'Content-Type': 'application/json', // Set the Content-Type header to application/json
    };
    console.log(serializedData);
    this.resto.postUpdateCompany(serializedData, headers).subscribe(
      (response: any) => {
        let counter=0;
        response.dbName.forEach((item : any)=>{
          if(!item.flag){
            counter=1;
          }

        })
        if(counter==0){
          const message = 'Company Edited Successfully';
            this.snackBar.openFromComponent(ToastComponent, {
            data: { message },
            duration: 2000, // Toast duration in milliseconds
            horizontalPosition: 'end',
            verticalPosition: 'top'
          });
        }
        else{
          const message = 'error while updating';
            this.snackBar.openFromComponent(ToastComponent, {
            data: { message },
            duration: 2000, // Toast duration in milliseconds
            horizontalPosition: 'end',
            verticalPosition: 'top'
          });
        }
      },
      (error: any) => {
        console.error('Error retrieving data:', error);
      }
    );

    
    
  
  }
  ClearForm() {
    this.applyForm.reset(); // Reset the form to its initial state
  }
  isFormFieldsEmpty(control: AbstractControl): boolean {
    if (control instanceof FormGroup) {
      for (const key in control.controls) {
        if (control.controls.hasOwnProperty(key)) {
          if (this.isFormFieldsEmpty(control.controls[key])) {
            return true; 
          }
        }
      }
    } else if (control instanceof FormArray) {
      for (const formControl of control.controls) {
        if (this.isFormFieldsEmpty(formControl)) {
          return true; 
        }
      }
    } else {
      if (/*control.invalid ||*/ control.value === null || control.value === '') {
        return true; 
      }
    }
  
    return false; // All fields are filled
  }
//   validateEmail(email: string): boolean {
   
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   }
  
//   validatePassword(password: string): boolean {
    
//     if (password.length < 8) {
//       return false; 
//     }
//     const hasUpperCase = /[A-Z]/.test(password); 
//   const hasLowerCase = /[a-z]/.test(password); 
//   const hasNumber = /\d/.test(password); 
//   const hasSpecialCharacter = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(password); 
  
 
//   return hasUpperCase && hasLowerCase && hasNumber && hasSpecialCharacter;
// }
  
//   validatePhone(phone: string): boolean {
    
//     const phoneRegex = /^\d{10}$/; 
//     return phoneRegex.test(phone);
//   }
}

export class CompanyData {
  [x: string]: any;
  constructor() {}
  //   sldbnameList: Sldbname[] = [];

  id!: number;
  Name!: string;
  slUrl!: string;
  slusername!: string;
  slPassword!: string;
  lastmodifiedby!: number;
  phone!: string;
  email!: string;
  DatabaseType!: string;
  DbName!: Sldbname[];
  comp_id!: number;
  hasPutAwayProc!: boolean;
  hasSsccNoManagement!: boolean;
  hasCartonNoManagement!: boolean;
  hasAutoBatchConfigurator!: boolean;
  defaultWarehouseCode!: number;
  isActive!: boolean;
  isDelete!: boolean;
  deletedDate!: string;
  deletedBy!: number;
  createdDate!: string;
  createdBy!: number;
  lastModifiedDate!: string;
  flag!:boolean;
  SLDBName!: string;
  SAPCompanyName!: string;
  error!: {
    code: number;
    message: string;
  };
}
export class Sldbname {
  dbName!: string;
  sapCompanyName!: string;
  flag: boolean = true;
}
