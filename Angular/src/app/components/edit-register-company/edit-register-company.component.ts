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
import { ActivatedRoute } from '@angular/router';

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
    private route: ActivatedRoute
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
    //console.log(this.id);
    this.resto.GetComapnyDataById(this.id).subscribe(
      (res) => {
        //console.log(res)
        this.applyForm.patchValue(res);
        const tableData = this.applyForm.get('tableData') as FormArray;
        // console.log("tbledata",tableData)
        res.dbName.forEach((item : { dbName: string, sapCompanyName: string, flag: string }) => {
          // console.log("item",item)
          tableData.push(this.createTableRow(item));
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  ngOnInit() {
    // this.dbNamearray = this.formBuilder.array([]);
    this.applyForm = this.formBuilder.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required]],
      slUrl: ['', Validators.required],
      sldbName: ['', Validators.required],
      slusername: ['', Validators.required],
      slPassword: ['', Validators.required],
      tableData: this.formBuilder.array([]),
      putCheckbox: [false],
      ssccCheckbox: [false],
      cartonCheckbox: [false],
      autoCheckbox: [false],
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
    // const row = this.formBuilder.group({
    //   dbName: new FormControl(''),
    //   sapCompanyName: new FormControl(''),
    //   flag: new FormControl(false),
    // });
    // this.tableData.push(row);
    tableData.push(this.createTableRow({ dbName: '', sapCompanyName: '' , flag:''}));
  }
  
  
  deleteRow(index: number) {
    // if(index!=0)
    //   this.tableData.removeAt(index);
    const tableData = this.applyForm.get('tableData') as FormArray;
    tableData.removeAt(index);
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
    // console.log(this.NewList);
    // console.log(this.applyForm.value.comp_id)
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
    
    // console.log(this.companyDataObj!.sldbname);
  
    const serializedData: string = JSON.stringify(this.companyDataObj);
    const headers = {
      'Content-Type': 'application/json', // Set the Content-Type header to application/json
    };
    console.log(serializedData);
    this.resto.postRegisterCompany(serializedData, headers).subscribe(
      (response: any) => {
        console.log('receved table data', response);
      },
      (error: any) => {
        console.error('Error retrieving data:', error);
      }
    );
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
  flag!:boolean;
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
