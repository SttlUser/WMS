import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/customer.service';
import { CustomToastrService } from 'src/custom-toastr.service' 


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit{

  changePasswordForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,private router: Router,private resto: CustomerService,private toastrService: CustomToastrService) {}

  ngOnInit(): void {
    this.changePasswordForm = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });

    
  }

  onSubmit(): void {
    if (this.changePasswordForm.valid) {
      // Perform the password update logic here
      const oldPassword = this.changePasswordForm.get('oldPassword')?.value;
      const newPassword = this.changePasswordForm.get('newPassword')?.value;
      const loggedInId = sessionStorage.getItem("loggedInId");
      console.log('Old Password:', oldPassword);
      console.log('New Password:', newPassword);

      this.resto.changePassword(loggedInId,oldPassword,newPassword).subscribe((data) => {
        this.toastrService.logInSuccess("Password changed successfully");
        console.log('get data', data);        
        this.router.navigate(['/DispayRoleMaster']);
      },(error)=>{
        this.toastrService.showErrorMessage("Something went wrong");
      }); 
    }
    else{
      alert("Fill all details");
    }
  }

  // Custom validator to check if new password and confirm password match
  passwordMatchValidator(formGroup: FormGroup) {
    const newPassword = formGroup.get('newPassword')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { passwordMismatch: 'Passwords do not match. Please re-enter your new password.' };
  }
}
