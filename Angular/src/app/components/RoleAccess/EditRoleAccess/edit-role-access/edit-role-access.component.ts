import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
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
export class EditRoleAccessComponent implements OnInit, AfterViewInit  {

  @ViewChildren('checkboxRef') checkboxes!: QueryList<ElementRef<HTMLInputElement>> ;
  @ViewChildren('childCheckboxRef') childCheckboxes!: QueryList<ElementRef<HTMLInputElement>> ;
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
    //this.initForm();

    this.roleForm = this.formBuilder.group({});

  for (const document of this.Accessdata) {
    this.roleForm.addControl(`CheDoc_${document.documentid}`, this.formBuilder.control(false));
    
    if (document.parentChildData && document.parentChildData.length > 0) {
      for (const child of document.parentChildData) {
        this.roleForm.addControl(`CheDoc_${document.documentid}_${child.value}`, this.formBuilder.control(false));
      }
    }
  }
  }

  ngAfterViewInit() {
    this.checkboxes!.forEach(checkbox => {
    });
  
    this.childCheckboxes!.forEach(childCheckbox => {
    });
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
    }
  
  }
  

  GetAccessData(http: HttpClient) {
    this.route.queryParams.subscribe((params) => {
      this.id = params['id'];
    });
    this.resto.GetRoleAccessData(this.id).subscribe(
      (response: any) => {
        console.log('received table data', response);
        this.Accessdata = response;
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
 
  const checkedValues: string[] = [];

    this.checkboxes.forEach(checkbox => {
      if (checkbox.nativeElement.checked) {
        console.log(checkbox.nativeElement.id)
        checkedValues.push(checkbox.nativeElement.id);
      }
    });

    this.childCheckboxes.forEach(childCheckbox => {
      if (childCheckbox.nativeElement.checked) {
        console.log(childCheckbox.nativeElement.checked)
        checkedValues.push(childCheckbox.nativeElement.id);
      }
    });

    console.log('Checked Values:', checkedValues);
    this.resto.PostRoleAccessData(this.id,checkedValues).subscribe((res:any)=>{
      console.log("data submited")
      this.toastrService.showSuccessMessage("User updated successfully");
      this.router.navigate(['/RoleAccessList']);
    },
    (err)=>{
      console.log("data not submitted")
    this.toastrService.showErrorMessage("Something went wrong");
    })
  }

  // checkboxChange(event: any, documentIndex: number) {
  //   // Access the checkbox value using event.target.checked and the document index
  //   console.log(`Checkbox at document index ${documentIndex} changed to ${event.target.checked}`);
  // }
  
  // childCheckboxChange(event: any, documentIndex: number, childIndex: number) {
  //   // Access the checkbox value using event.target.checked and the document and child indexes
  //   console.log(`Child checkbox at document index ${documentIndex}, child index ${childIndex} changed to ${event.target.checked}`);
  // }

  parentCheckboxChange(event: any, documentIndex: number) {
    // Update the parent checkbox's flag
    this.Accessdata[documentIndex].flag = event.target.checked;
  
    // Update all child checkboxes' state
    this.Accessdata[documentIndex].parentChildData.forEach((child:any) => {
      child.disabled = event.target.checked;
    });
  
    // Update the form control value
    const parentFormControl = this.roleForm.get(`${this.Accessdata[documentIndex].documentid}`);
    parentFormControl?.setValue(event.target.checked);
  
    this.cdRef.detectChanges(); // Detect changes to the view
  }

  childCheckboxChange(event: any, documentIndex: number, childIndex: number) {
    // Update the child checkbox's state
    this.Accessdata[documentIndex].parentChildData[childIndex].disabled = event.target.checked;
  
    // Check if at least one child checkbox is selected, and update the parent checkbox accordingly
    const atLeastOneChildSelected = this.Accessdata[documentIndex].parentChildData.some((child:any) => child.disabled);
    this.Accessdata[documentIndex].flag = atLeastOneChildSelected;
  
    // Update the form control values
    const parentFormControl = this.roleForm.get(`CheDoc_${this.Accessdata[documentIndex].documentid}`);
    parentFormControl?.setValue(atLeastOneChildSelected);
  
    this.cdRef.detectChanges(); // Detect changes to the view
  }
}
