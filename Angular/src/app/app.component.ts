import { Component } from '@angular/core';
import { ToastService } from './components/toast/toast.service';
import { Toast } from './components/toast/toast.model';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'WMS';
  showNavbar = true;
  toasts: Toast[] = [];

  constructor(private toastService: ToastService,private router:Router) { 
   
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
  ngOnInit(): void {
    // this.toastService.getToast().subscribe((toast: Toast) => {
    //   this.toasts.push(toast);
    //   setTimeout(() => this.removeToast(toast), 3000);
    // // });
  }
  // removeToast(toast: Toast): void {
  //   this.toasts = this.toasts.filter(t => t !== toast);
  // }
  // showSuccessToast(): void {
  //   this.toastService.showSuccess('Success message!');
  // }

  // showErrorToast(): void {
  //   this.toastService.showError('Error message!');
  // }
}