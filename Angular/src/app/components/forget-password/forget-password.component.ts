import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/customer.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {
  forgetForm!: FormGroup;
  recievedData:any;
  isLoading: boolean = false;

  constructor(private formBuilder: FormBuilder,private route: ActivatedRoute,private resto: CustomerService,private router: Router) { }

  ngOnInit() {
    this.forgetForm = this.formBuilder.group({
      newPassword: ['', [Validators.required]],
    });

    this.route.queryParams.subscribe(params => {
      this.recievedData = params['recievedResponse'];
    });
    console.log(this.recievedData)
  }

  onSubmit() {
    console.log(this.forgetForm.valid)
    if (this.forgetForm.valid) {
      // Process the form submission and reset the password
      const newPassword = this.forgetForm.value.newPassword;
      console.log('New Password:', newPassword," id ",this.recievedData);

      this.isLoading= true;
      // Perform the password reset logic here...
      this.resto.updatePassword(newPassword,this.recievedData).subscribe(
        (response: any) => {
          console.log('receved table data', response);
          this.isLoading= false;
          this.router.navigate(['/home'])
        },
        (error) => {
          this.isLoading= false;
          console.error('Error retrieving data:', error);
        }
      );
    }
  }

}
