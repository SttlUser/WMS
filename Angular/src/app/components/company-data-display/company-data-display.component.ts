import { HttpClient } from '@angular/common/http';
import { AfterViewInit, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/customer.service';
import { Component, EventEmitter, Output, Input } from '@angular/core';
import { environment } from 'src/environment';
import { Injectable } from '@angular/core';

// import * as $ from 'jquery';
// import 'datatables.net';
// import 'datatables.net-dt';
@Injectable({
	providedIn: 'root'
  })
@Component({
  selector: 'app-company-data-display',
  templateUrl: './company-data-display.component.html',
  styleUrls: ['./company-data-display.component.css'],
})
export class CompanyDataDisplayComponent implements AfterViewInit {
  Dispaly_url = `${environment.api.server}/`;

  Comapnydata: any;

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

  dataLoaded = true;

  constructor(private router: Router,private resto: CustomerService,public http: HttpClient) {
    this.GetComapnyMasterData(http);

    const err = JSON.parse(localStorage.getItem('error') || '{}');
    if (err.code !== 0) {
      console.log('Error', err);
      this.router.navigate(['/login']);
      // console.log(this.data);
    }
  }

  ngAfterViewInit(): void {}
  initializeDataTable() {
    // $(document).ready(() => {
    //   $('#myTable').DataTable();
    // });
  }

  GotoCompanypage() {
    this.router.navigate(['/register-company']);
  }

  GetComapnyMasterData(http: HttpClient) {
    this.http
      .get(this.Dispaly_url + 'CompanyMaster/GetCompanyDetails')
      .subscribe(
        (res) => {
          console.log('API data', res);
          this.Comapnydata = res;
          console.log(this.Comapnydata);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  UpdateCompany(row:any) {
    this.CompanydataUpdate.comp_id = row.CompanyID;
	this.CompanydataUpdate.name = row.name;
	this.CompanydataUpdate.phone = row.phone;
	this.CompanydataUpdate.email = row.email;
	this.CompanydataUpdate.slUrl = row.slUrl;
	this.CompanydataUpdate.slusername=row.slusername;
	this.CompanydataUpdate.slPassword=row.SLPassword;
    this.CompanydataUpdate.lastmodifiedby = row.lastmodifiedby;
    this.CompanydataUpdate.id = row.id;
    this.CompanydataUpdate.isActive = row.isActive;
    this.CompanydataUpdate.isDelete = row.isDelete;
	//this.router.navigate(['/register-company'], { state: { objectData: this.CompanydataUpdate } });
		this.resto.setObject(this.CompanydataUpdate);
	  this.router.navigate(['/edit-register-company'] ,{ queryParams: { id: row.companyID } });
  }

  // UpdateCompany(rol : any) {
  //   this.CompanyData.

  //   this.router.navigate(['/register-company']);
  //   alert('update button clicked');
  // }

//   companyDataObj: CompanyData = new CompanyData();
//   sldbnameobj:Sldbname = new Sldbname();
//   SLDbName: string[] = [""];
//   NewList:Sldbname[]=[];
//   sapcompanyname: string[] = [""];
  deletebtn(row: any) {
	const serializedData: string = JSON.stringify(4,row.lastmodifiedby,row.comp_id);
	const headers = {
		'Content-Type': 'application/json' // Set the Content-Type header to application/json
	  };
	  console.log(serializedData);
    if (window.confirm('Do you really want to delete?')) {
      this.resto
        .DeleteCompanyData(4,serializedData,headers).subscribe(
          (res) => {
            console.log(res);
            	
            this.GetComapnyMasterData(this.http);
          },
          (err) => {
            console.log(err);
          }
        );
    }
  }

 
  activebtn(row: any) {
	const serializedData: string = JSON.stringify(4,row.lastmodifiedby,row.comp_id);
	const headers = {
		'Content-Type': 'application/json' // Set the Content-Type header to application/json
	  };
    if (window.confirm('Do you really want to Activate?')) {
		this.resto
        .ActivateCompanyData(4,serializedData,headers).subscribe(
          (res) => {
            console.log(res);
            console.log(row.id);
            this.GetComapnyMasterData(this.http);
          },
          (err) => {
            console.log(err);
          }
        );
		
    }
  }
}


// export class CompanyData {
//   [x: string]: any;
//   constructor() {}
//   //   sldbnameList: Sldbname[] = [];

//   id!: number;
//   companyName!: string;
//   slUrl!: string;
//   slusername!: string;
//   slPassword!: string;
//   lastmodifiedby!: number;
//   phone!: string;
//   email!: string;
//   db_type!: string;
//   sldbname!: Sldbname[];
//   comp_id!: number;
//   hasPutAwayProc!: boolean;
//   hasSsccNoManagement!: boolean;
//   hasCartonNoManagement!: boolean;
//   hasAutoBatchConfigurator!: boolean;
//   defaultWarehouseCode!: number;
//   isActive!: boolean;
//   isDelete!: boolean;
//   deletedDate!: string;
//   deletedBy!: number;
//   createdDate!: string;
//   createdBy!: number;
//   lastModifiedDate!: string;
//   error!: {
//     code: number;
//     message: string;
//   };
// }

// export class Sldbname{
// 	DbName:string="";
// 	sapCompanyName:string="";
// 	flag:boolean=false;
// }