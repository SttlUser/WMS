import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from 'src/app/customer.service';
import { environment } from 'src/environment';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ConstantPool } from '@angular/compiler';
import { ToastComponent } from '../toast/toast.component';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor(
    private formBuilder: FormBuilder,
    private resto: CustomerService,
    public http: HttpClient,
    private router: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.applyForm = this.formBuilder.group({
      tableData: this.formBuilder.array([]),
    });
    this.objectData = {};
    this.objectData = this.resto.getObject();
  }

  // url: string = `${environment.api.server}/`;
  ngOnInit() {
    this.applyForm = this.formBuilder.group({
      companyName: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required]],
      SLUrl: ['', Validators.required],
      db_type: ['', Validators.required],
      slusername: ['', Validators.required],
      SLPassword: ['', Validators.required],
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

  onSubmit() {
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
    this.companyDataObj!.hasSsccNoManagement =     this.applyForm.value.ssccCheckbox;
    this.companyDataObj!.hasCartonNoManagement =      this.applyForm.value.cartonCheckbox;
    this.companyDataObj!.defaultWarehouseCode = this.applyForm.value.whsInput;
    this.companyDataObj!.hasAutoBatchConfigurator =      this.applyForm.value.autoCheckbox;
    this.companyDataObj!.createdDate = '1-2-3';
    this.companyDataObj!.deletedDate = '1-2-3';
    this.companyDataObj!.lastModifiedDate = '1-2-3';
    this.companyDataObj!.SLDBName = '';
    this.companyDataObj!.SAPCompanyName = '';

    console.log(this.companyDataObj!.DbName);

    const serializedData: string = JSON.stringify(this.companyDataObj);
    const headers = {
      'Content-Type': 'application/json', // Set the Content-Type header to application/json
    };
    console.log(serializedData);
    this.resto.postRegisterCompany(serializedData, headers).subscribe(
      (response: any) => {
        console.log('receved table data', response);
        const message = 'Company Added Successfully';
        this.snackBar.openFromComponent(ToastComponent, {
          data: { message },
          duration: 2000, // Toast duration in milliseconds
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
        this.NewList=[];
      },
      (error: any) => {
        console.error('Error retrieving data:', error);
        const message = 'Something went wrong.';
        this.snackBar.openFromComponent(ToastComponent, {
          data: { message },
          duration: 2000, // Toast duration in milliseconds
          horizontalPosition: 'end',
          verticalPosition: 'top'
        });
      }
    );
  }

  get tableData() {
    return this.applyForm.get('tableData') as FormArray;
  }

  createTableRow(): FormGroup {
    return this.formBuilder.group({
      dbName: ['', Validators.required],
      sapCompanyName: ['', Validators.required],
      status: [false],
    });
  }

  addRow() {
    this.tableData.push(this.createTableRow());
  }

  deleteRow(index: number) {
    if (index != 0) {
      this.tableData.removeAt(index);
    }
  }
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
