import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Toast } from './toast.model';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  
  
  reciever_string:any;
  
  recieve(reciever_string:any){
    alert("toast_service"+ reciever_string);
    console.log("in toast service");
  }

    
      
    

  
 
  // private toastSubject = new Subject<Toast>();

  // constructor() { }

  // getToast() {
  //   return this.toastSubject.asObservable();
  // }

  // showSuccess(message: string): void {
  //   this.toastSubject.next({ message, type: 'success' });
  // }
  // private toastMessageSource = new Subject<string>();
  // toastMessage$ = this.toastMessageSource.asObservable();

  // showSuccessToast(message: string): void {
  //   this.toastMessageSource.next(message);
  // }

  // showError(message: string): void {
  //   this.toastMessageSource.next(message);
  // }
}
