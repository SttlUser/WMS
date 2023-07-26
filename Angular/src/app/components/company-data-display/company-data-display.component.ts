import { HttpClient } from '@angular/common/http';
import { AfterViewInit, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/customer.service';
import { Component, EventEmitter, Output, Input } from '@angular/core';
import { environment } from 'src/environment';
import { Injectable } from '@angular/core';
import { ToastComponent } from '../toast/toast.component';
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


  constructor(private router: Router,private resto: CustomerService,public http: HttpClient,private snackBar: MatSnackBar) {
    
    const err = JSON.parse(localStorage.getItem('error') || '{}');
    if (err.code !== 0) {
      console.log('Error', err);
      this.router.navigate(['/login']);
      // console.log(this.data);
    }
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
          // console.log(res)
          this.Comapnydata = res;
          this.initializeDataTable();
        },
        (err) => {
          console.log(err);
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

  initializeDataTable() {
    $(document).ready(() => {
      $('#mytable').DataTable({
        scrollX:true,
        autoWidth:true,
        retrieve: true,
        paging: false
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
      this.resto
        .DeleteCompanyData(4, 42,row.companyID).subscribe(
          (res) => {
            this.GetComapnyMasterData(this.http);
            const message = 'Company Deleted Successfully';
            this.snackBar.openFromComponent(ToastComponent, {
              data: { message },
              duration: 2000, // Toast duration in milliseconds
              horizontalPosition: 'end',
              verticalPosition: 'top'
            });
          },
          (err) => {
            console.log(err);
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
  }

 
  activebtn(row: any) {
  if (window.confirm('Do you really want to Activate?')) {
		this.resto
        .ActivateCompanyData(5, 42,row.companyID).subscribe(
          (res) => {
            this.GetComapnyMasterData(this.http);
            const message = 'Company Activated Successfully';
            this.snackBar.openFromComponent(ToastComponent, {
            data: { message },
            duration: 2000, // Toast duration in milliseconds
            horizontalPosition: 'end',
            verticalPosition: 'top'
          });
          },
          (err) => {
            const message = 'Something wnent wrong.';
              this.snackBar.openFromComponent(ToastComponent, {
              data: { message },
              duration: 2000, // Toast duration in milliseconds
              horizontalPosition: 'end',
              verticalPosition: 'top'
            });
          }
        );
		
    }
  }
}

