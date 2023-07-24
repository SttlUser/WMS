import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../components/toast/toast.service';
import { Toast } from '../components/toast/toast.model';
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
    <router-outlet></router-outlet>
  `
})
export class LayoutComponent  implements OnInit {
  title = 'WMS';
  showNavbar = true;
  toasts: Toast[] = [];
  header!: string;
  subheader!:string;
  constructor(private toastService: ToastService,private router:Router, private activatedRoute: ActivatedRoute,private appComponent: AppComponent,private dataService: DataService) { }
  ngOnInit() {
    // Subscribe to the headerData$ observable to receive the data
    this.dataService.headerData$.subscribe(data => {
      this.header = data.header;
      this.subheader = data.subheader;
    });
  }
  
}
