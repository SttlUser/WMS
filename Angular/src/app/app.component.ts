import { Component } from '@angular/core';
import { ToastService } from './components/toast/toast.service';
import { Toast } from './components/toast/toast.model';
import { NavigationEnd, Router ,ActivatedRoute} from '@angular/router';
import { filter, map } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  template: `
    <router-outlet></router-outlet>
    <h1>{{ headerName }}</h1>
  `,
})
export class AppComponent {
  title = 'WMS';
  showNavbar = true;
  toasts: Toast[] = [];
  HeaderName: string = 'Header';
  SubHeaderName:string='Sub Header';

  constructor(private toastService: ToastService,private router:Router, private activatedRoute: ActivatedRoute) { 
   
    router.events.subscribe(
      (val)=>{
        if(val instanceof NavigationEnd){
          if(val.url=='/login'){
            this.showNavbar=false;
          }
        }
      }
    )

  }
  ngOnInit() {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => {
          let route = this.activatedRoute;
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter(route => route.outlet === 'primary'),
        map(route => route.snapshot.data)
      )
      .subscribe(data => {
        this.HeaderName = data['header'];
        this.SubHeaderName = data['subheader'];
      });
  }

}
