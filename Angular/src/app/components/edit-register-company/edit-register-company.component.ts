import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { CustomerService } from 'src/app/customer.service';
import { environment } from 'src/environment';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Route, Router } from '@angular/router';
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
  isFlagTrue: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private resto: CustomerService,
    public http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    // this.applyForm = this.formBuilder.group({
    //   dbName: this.formBuilder.array([]),
    // });
    // this.dbNamearray = this.applyForm.get('dbName') as FormArray;
    this.isFlagTrue= true;
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
        console.log(res)
        this.applyForm.patchValue(res);
        const tableData = this.applyForm.get('tableData') as FormArray;
        res.dbName.forEach(
          (item: { dbName: string; sapCompanyName: string; flag: boolean }) => {
            tableData.push(this.createTableRow(item));
          }
        );
      },
      (err) => {
        console.log(err);
      }
    );
  }

  ngOnInit() {
    this.applyForm = this.formBuilder.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required]],
      slUrl: ['', Validators.required],
      databaseType: ['Default', Validators.required],
      slusername: ['', Validators.required],
      slPassword: ['', Validators.required],
      tableData: this.formBuilder.array([]),
      putCheckbox: [true],
      ssccCheckbox: [true],
      cartonCheckbox: [true],
      autoCheckbox: [true],
      whsInput: ['1'],
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

  createTableRow(item: {dbName: string; sapCompanyName: string; flag: boolean; }): FormGroup {
    this.isFlagTrue = item.flag;

    return this.formBuilder.group({
      dbName: [item.dbName],
      sapCompanyName: [item.sapCompanyName],
      flag: [item.flag]
    });
  }

  addRow() {
    const tableData = this.applyForm.get('tableData') as FormArray;
    tableData.push(
      this.createTableRow({ dbName: '', sapCompanyName: '', flag: false })
    );
  }

  deleteRow(index: number) {
    const tableData = this.applyForm.get('tableData') as FormArray;
    if (index != 0) {
      this.tableData.removeAt(index);
    }
  }

  onSubmit() {
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

    if(this.applyForm.value.databaseType == 'Default'){
      alert("Select database");
      return;
    }

    this.companyDataObj!.id = this.id;
    this.companyDataObj!.Name = this.applyForm.value.name;
    this.companyDataObj!.slUrl = this.applyForm.value.slUrl;
    this.companyDataObj!.slusername = this.applyForm.value.slusername;
    this.companyDataObj!.slPassword = this.applyForm.value.slPassword;
    this.companyDataObj!.phone = this.applyForm.value.phone;
    this.companyDataObj!.email = this.applyForm.value.email;
    this.companyDataObj!.DatabaseType = this.applyForm.value.databaseType;
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
    // console.log(serializedData);
    this.resto.postUpdateCompany(serializedData, headers).subscribe(
      (response: any) => {
        let counter = 0;
        response.dbName.forEach((item: any) => {
          if (!item.flag) {
            counter = 1;
          }
        });
        if (counter == 0) {
          const message = 'Company Edited Successfully';
          this.snackBar.openFromComponent(ToastComponent, {
            data: { message },
            duration: 2000, // Toast duration in milliseconds
            horizontalPosition: 'end',
            verticalPosition: 'top',
          });
        } else {
          const message = 'error while updating';
          this.snackBar.openFromComponent(ToastComponent, {
            data: { message },
            duration: 2000, // Toast duration in milliseconds
            horizontalPosition: 'end',
            verticalPosition: 'top',
          });
        }
      },
      (error: any) => {
        console.error('Error retrieving data:', error);
      }
    );
  }

  cancel(){
    this.router.navigate(['/DisplayCompany'])
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
  flag!: boolean;
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
