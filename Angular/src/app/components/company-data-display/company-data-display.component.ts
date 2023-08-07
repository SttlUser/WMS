import { HttpClient } from '@angular/common/http';
import { AfterViewInit, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/customer.service';
import { Component, EventEmitter, Output, Input } from '@angular/core';
import { environment } from 'src/environment';
import { CustomToastrService } from 'src/custom-toastr.service' 
import { Injectable } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt';

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
  loading: boolean = true;


  Comapnydata: any;
  loggedInId:any
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


    
    constructor(private router: Router,private resto: CustomerService,public http: HttpClient,private snackBar: MatSnackBar,private toastrService: CustomToastrService) {
    
    const err = JSON.parse(localStorage.getItem('error') || '{}');
    if (err.code !== 0) {
      console.log('Error', err);
      this.router.navigate(['/login']);
      // console.log(this.data);
    }
    this.loggedInId = sessionStorage.getItem('loggedInId');
    this.GetComapnyMasterData(http);
  }

  ngAfterViewInit(): void {}
  

  GotoCompanypage() {
    this.router.navigate(['/RegisterCompany']);
  }

  GetComapnyMasterData(http: HttpClient) {
    this.http
      .get(this.Dispaly_url + 'CompanyMaster/GetCompanyDetails')
      .subscribe(
        (res) => {
          console.log(res)
          this.Comapnydata = res;
          this.initializeDataTable();
          this.loading = false;

        },
        (err) => {
          console.log(err);
         
        }
      );
  }

  initializeDataTable() {
    $(document).ready(() => {
      $('#mytable').DataTable({
        scrollX:true,
        autoWidth:true,
        retrieve: true,
        paging: true,
        order: [[ 4, "desc" ]]
      });
    });
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
		this.resto.setObject(this.CompanydataUpdate);
	  this.router.navigate(['/EditRegisteredCompany'] ,{ queryParams: { id: row.companyID } });
  }


  deletebtn(row: any) {
    if (window.confirm('Do you really want to delete?')) {
    const loggedInId = this.loggedInId
      this.resto
        .DeleteCompanyData(4, loggedInId, row.companyID).subscribe(
          (res) => {
            this.GetComapnyMasterData(this.http);
            this.toastrService.logInSuccess("Company deactivated successfully");
          },
          (err) => {
            console.log(err);
            this.toastrService.showErrorMessage("Something went wrong");
          }
        );
    }
  }

 
  activebtn(row: any) {
  if (window.confirm('Do you really want to Activate?')) {
    const loggedInId = this.loggedInId
		this.resto
        .ActivateCompanyData(5, loggedInId, row.companyID).subscribe(
          (res) => {
            this.toastrService.logInSuccess("Company activated successfully");
            this.GetComapnyMasterData(this.http);
           
          },
          (err) => {
            this.toastrService.showErrorMessage("Something went wrong");
           
          }
        );
		
    }
  }
}

