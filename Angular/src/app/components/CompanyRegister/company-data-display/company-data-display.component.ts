import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/customer.service';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt';

@Component({
  selector: 'app-company-data-display',
  templateUrl: './company-data-display.component.html',
  styleUrls: ['./company-data-display.component.css']
})
export class CompanyDataDisplayComponent implements AfterViewInit {
  ComapnyData:any;
  dataLoaded = false;
  constructor(private router: Router, http:HttpClient, private resto: CustomerService){
    const err = JSON.parse(localStorage.getItem('error') || '{}');
    if (err.code !== 0) {
      console.log("Error", err);
      this.router.navigate(['/login']);
    }
    this.GetComapnyMasterData(); // To Fetch the data and append it in html table tag
  }
  ngAfterViewInit(): void {
     
  }
  initializeDataTable() {
    $(document).ready(() => {
      $('#myTable').DataTable();
    });
  }

  
  GotoCompanypage(){
    this.router.navigate(['/company-edit-page']);
  }
  GetComapnyMasterData(){
    this.resto.GetCompanyData().subscribe(
      (res)=>{
        console.log(res);
        this.ComapnyData=res;
       this.initializeDataTable();
      },
      (err)=>{
        console.log(err);
      }
    )
  }
}
