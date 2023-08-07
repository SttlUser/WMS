import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AppComponent } from '../app.component';
import { DataService } from '../data.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  template: `
    <div>
      <!-- Display the header and subheader from the shared service -->
      <h1>{{ header }}</h1>
      <h3>{{ subheader }}</h3>
    </div>
    <app-toast></app-toast>
    <router- ></router-outlet>
  `
})
export class LayoutComponent  implements OnInit {
  title = 'WMS';
  showNavbar = true;
  header!: string;
  subheader!:string;
  constructor(private router:Router, private activatedRoute: ActivatedRoute,private appComponent: AppComponent,private dataService: DataService) { }
  ngOnInit() {
    // Subscribe to the headerData$ observable to receive the data
    this.dataService.headerData$.subscribe(data => {
      this.header = data.header;
      this.subheader = data.subheader;
    });

   
  }  
  isDrawerOpen: boolean = false;

  toggleDrawer() {
    this.isDrawerOpen = !this.isDrawerOpen;
  }
}
