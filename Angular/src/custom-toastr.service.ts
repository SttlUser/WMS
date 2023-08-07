import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Injectable({
    providedIn: 'root'
  })
  export class CustomToastrService {
    constructor(private toastr: ToastrService) {}

    showSuccessMessage(message: string) {
        this.toastr.success(message);
      }
    
      showErrorMessage(message: string) {
        this.toastr.error(message);
      }
    
      showInfoMessage(message: string) {
        this.toastr.info(message);
      }
    
      showWarningMessage(message: string) {
        this.toastr.warning(message);
      }
      
      logInSuccess(message: string) {
        this.toastr.success(message);
      }
  }