import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from 'src/app/customer.service';
import { environment } from 'src/environment';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ConstantPool } from '@angular/compiler';
import { CustomToastrService } from 'src/custom-toastr.service' 

@Component({
  selector: 'app-register-company',
  templateUrl: './register-company.component.html',
  styleUrls: ['./register-company.component.css'],
})
export class RegisterCompanyComponent implements OnInit {
  applyForm!: FormGroup;
  activeTab: string = 'registrationTab';
  SLDbName: string[] = [];
  NewList: Sldbname[] = [];
  sapcompanyname: string[] = [];
  objectData: any;
  loggedInID: any;

  constructor(
    private formBuilder: FormBuilder,
    private resto: CustomerService,
    public http: HttpClient,
    private router: ActivatedRoute,
    private toastrService: CustomToastrService
   
  ) {
    this.applyForm = this.formBuilder.group({
      tableData: this.formBuilder.array([]),
    });
    this.loggedInID = sessionStorage.getItem('loggedInID');
    this.objectData = {};
    this.objectData = this.resto.getObject();
  }

  // url: string = `${environment.api.server}/`;
  ngOnInit() {
    this.applyForm = this.formBuilder.group({
      companyName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\d+$/), Validators.pattern(/^\d{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      SLUrl: ['', Validators.required],
      db_type: ['Default', Validators.required],
      slusername: ['', Validators.required],
      SLPassword: ['', [Validators.required]],
      tableData: this.formBuilder.array([this.createTableRow()]),
      putCheckbox: [true],
      ssccCheckbox: [true],
      cartonCheckbox: [true],
      autoCheckbox: [true],
      whsInput: ['1'],
    });
  }
  //innerClass: CompanyData | undefined;
  companyDataObj: CompanyData = new CompanyData();
  Sldbnamelistobj: Sldbname = new Sldbname();
 
  clearForm1() {
    this.applyForm.reset();
    this.clearFormArray(this.applyForm.get('tableData') as FormArray); // Reset the formArray
    this.applyForm.patchValue({ // Reset the checkboxes
      putCheckbox: true,
      ssccCheckbox: true,
      cartonCheckbox: true,
      autoCheckbox: true,
    });
  }

  clearFormArray(formArray: FormArray) {
    while (formArray.length !== 0) {
      formArray.removeAt(0);
    }
  }
  
  createTableRowForTableData(): FormGroup {
    return this.formBuilder.group({
      // Define the fields for each table row if applicable
    });
  } 
    
  

  onSubmit() {
    

    const companyNameControl = this.applyForm.get('companyName');
    if (companyNameControl && companyNameControl.invalid /*&& companyNameControl.touched*/) {
    if (companyNameControl.errors?.['required']) {
      alert('Company Name is required.');
    }
    return;
  }
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
   const SLUrlNameControl = this.applyForm.get('SLUrl');
    if (SLUrlNameControl && SLUrlNameControl.invalid /*&& SLUrlNameControl.touched*/) {
    if (SLUrlNameControl.errors?.['required']) {
      alert('Url is required.');
    }
    return;
  }
   const UsernameNameControl = this.applyForm.get('slusername');
    if (UsernameNameControl && UsernameNameControl.invalid /*&& UsernameNameControl.touched*/) {
    if (UsernameNameControl.errors?.['required']) {
      alert('Username is required.');
    }
    return;
  }
  const passwordNameControl = this.applyForm.get('SLPassword');
    if (passwordNameControl && passwordNameControl.invalid /*&& passwordNameControl.touched*/) {
    if (passwordNameControl.errors?.['required']) {
      alert('Password is required.');
    }
    return;
  }
  const DBControl = this.applyForm.get('dbName');
    if (DBControl && DBControl.invalid /*&& passwordNameControl.touched*/) {
    alert("db name askjdkas")
    return;
  }
  if (this.isFormFieldsEmpty(this.applyForm)) {

    alert('Please fill in all the required fields.');
    return;
  }
  
  
  
    
    
    
    this.SLDbName = this.tableData.controls.map(
      (control) => (control as FormGroup).get('dbName')?.value || ''
    );
    this.sapcompanyname = this.tableData.controls.map(
      (control) => (control as FormGroup).get('sapCompanyName')?.value || ''
    );

    for (let i = 0; i < this.SLDbName.length; i++) {
      const sldbname: Sldbname = new Sldbname();
      sldbname.DbName = this.SLDbName[i];
      sldbname.sapCompanyName = this.sapcompanyname[i] || '';
      this.NewList.push(sldbname);
    }
    console.log(this.NewList);

    this.companyDataObj!.id = 1;
    this.companyDataObj!.Name = this.applyForm.value.companyName;
    this.companyDataObj!.slUrl = this.applyForm.value.SLUrl;
    this.companyDataObj!.slusername = this.applyForm.value.slusername;
    this.companyDataObj!.slPassword = this.applyForm.value.SLPassword;
    this.companyDataObj!.phone = this.applyForm.value.phone;
    this.companyDataObj!.email = this.applyForm.value.email;
    this.companyDataObj!.DatabaseType = this.applyForm.value.db_type;
    this.companyDataObj!.DbName = this.NewList;
    this.companyDataObj!.hasPutAwayProc = this.applyForm.value.putCheckbox;
    this.companyDataObj!.hasSsccNoManagement =
      this.applyForm.value.ssccCheckbox;
    this.companyDataObj!.hasCartonNoManagement =
      this.applyForm.value.cartonCheckbox;
    this.companyDataObj!.defaultWarehouseCode = this.applyForm.value.whsInput;
    this.companyDataObj!.hasAutoBatchConfigurator =
      this.applyForm.value.autoCheckbox;
    this.companyDataObj!.createdDate = '1-2-3';
    this.companyDataObj!.deletedDate = '1-2-3';
    this.companyDataObj!.lastModifiedDate = '1-2-3';
    this.companyDataObj!.SLDBName = '';
    this.companyDataObj!.SAPCompanyName = '';

    console.log(this.companyDataObj!.DbName);

    const serializedData: string = JSON.stringify(this.companyDataObj);
    const headers = {
      'Content-Type': 'application/json', 
    };

    console.log(serializedData);


    this.resto.postRegisterCompany(serializedData, headers).subscribe(
      (response: any) => {


        console.log('receved table data', response);
        response.dbName.forEach((element:any) => {
          console.log(element.flag)
          
          if(element.flag==false){
            alert("Data invalid");
            return;
          }
          else{
            this.toastrService.logInSuccess("Company added successfully");
          }

        })
      },
      (error: any) => {
        this.toastrService.showErrorMessage("Something went wrong");       
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
      if (control.invalid || control.value === null || control.value === '') {
        return true;
      }
    }

    return false; 
  }
  

  get tableData() {
    return this.applyForm.get('tableData') as FormArray;
  }

  createTableRow(): FormGroup {
    return this.formBuilder.group({
      dbName: ['', Validators.required, Validators.minLength(1)],
      sapCompanyName: ['', Validators.required, Validators.minLength(1)],
      status: [false],
    });
  }

  addRow(row: any) {
    this.SLDbName = this.tableData.controls.map(
      (control) => (control as FormGroup).get('dbName')?.value || ''
    );
    this.sapcompanyname = this.tableData.controls.map(
      (control) => (control as FormGroup).get('sapCompanyName')?.value || ''
    );

    for (let i = 0; i < this.SLDbName.length; i++) {
      const sldbname: Sldbname = new Sldbname();
      sldbname.DbName = this.SLDbName[i];
      sldbname.sapCompanyName = this.sapcompanyname[i];
      this.NewList.push(sldbname);
    }

    if (this.NewList.length === 0) {
      window.alert("Please enter at least one valid record.");
      console.log("here");
      this.NewList = [];
    } else {
      let hasEmptyFields = false;
      for (const sldbname of this.NewList) {
        if (sldbname.DbName === '' || sldbname.sapCompanyName === '') {
          hasEmptyFields = true;
          break;
        }
      }
      if (hasEmptyFields) {
        window.alert("Please enter both record.");
        this.NewList = [];
      } else {
        const newRow = this.createTableRow();
        const dbNameControl = this.applyForm.value;
        console.log(dbNameControl);
        this.tableData.push(newRow);
      }
    }


  }










  deleteRow(index: number) {
    if (index != 0) {
      this.tableData.removeAt(index);
    }
  }

  clearForm() {
    this.applyForm.reset();
    this.applyForm.get('db_type')?.setValue('Default');
  }
}

export class CompanyData {
  [x: string]: any;
  constructor() { }
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
  SLDBName!: string;
  SAPCompanyName!: string;
  error!: {
    code: number;
    message: string;
  };
}
export class Sldbname {
  DbName!: string;
  sapCompanyName!: string;
  flag: boolean = true;
}
