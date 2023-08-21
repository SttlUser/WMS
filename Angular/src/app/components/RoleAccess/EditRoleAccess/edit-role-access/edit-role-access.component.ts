import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CustomerService } from 'src/app/customer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CustomToastrService } from 'src/custom-toastr.service';

@Component({
  selector: 'app-edit-role-access',
  templateUrl: './edit-role-access.component.html',
  styleUrls: ['./edit-role-access.component.css'],
})
export class EditRoleAccessComponent implements OnInit {
  loading: boolean = true;
  showNavbar: boolean = true;
  isLoggedIn: boolean = true;
  id: any;

  Accessdata: any[] = [];
  subAccessdata: any;
  roleForm!: FormGroup;

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.id = params['id'];
    });

    this.GetAccessData(this.http);
    this.initForm();
  }

  constructor(
    private router: Router,
    private resto: CustomerService,
    private formBuilder: FormBuilder,
    public http: HttpClient,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private location: Location,
    private toastrService: CustomToastrService,
	private cdRef: ChangeDetectorRef
  ) {
    //for navbar hiding
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        if (val.url == '/edit-role-access') {
          this.showNavbar = true;
        }
      }
    });

    const err = JSON.parse(localStorage.getItem('error') || '{}');
    if (err.code !== 0) {
      console.log('Error', err);
      this.router.navigate(['/login']);
      // console.log(this.data);
    }
    // this.GetAccessData(http);
  }
  private initForm() {
    this.roleForm = this.formBuilder.group({
      documents: this.formBuilder.array([])
    });
  }

  private initializeFormControls() {
    const documentControls = this.Accessdata.map(() => this.formBuilder.control(false));
    this.roleForm.setControl('documents', this.formBuilder.array(documentControls));

  }

  GetAccessData(http: HttpClient) {
    this.route.queryParams.subscribe((params) => {
      this.id = params['id'];
    });
    this.resto.GetRoleAccessData(this.id).subscribe(
      (response: any) => {
        console.log('received table data', response);
        this.Accessdata = response;
        // response.forEach((element: any) => {
        //   if (element.parentChildData.length > 0) {
        //     this.subAccessdata = element.parentChildData;
        //     console.log(this.subAccessdata);
        //   }
        // });
        //this.initializeFormControls();
        this.loading = false;
      },
      (error) => {
        console.error('Error retrieving data:', error);
        this.loading = false;
      }
    );
  }

  CloseBtn() {}

  PostrbacData() {
    const selectedDocumentsFormArray = this.roleForm.get('documents') as FormArray;

    if (selectedDocumentsFormArray) {
      const selectedIndexes = selectedDocumentsFormArray.controls
        .map((control, index) => control.value ? index : null)
        .filter(index => index !== null);

      console.log('Selected Checkbox Indexes:', selectedIndexes);
      // You can send the selectedIndexes data to your server or process it as needed
    }
    
  }
}
