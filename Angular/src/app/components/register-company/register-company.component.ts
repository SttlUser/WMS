import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-company',
  templateUrl: './register-company.component.html',
  styleUrls: ['./register-company.component.css']
})
export class RegisterCompanyComponent implements OnInit {
  applyForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.applyForm = this.formBuilder.group({
      companyName: ['', Validators.required],
      phoneNo: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      liveServiceLayerUrl : ['', Validators.required],
      databaseType : ['', Validators.required],
      companyRegistrationNo : ['', Validators.required],
      password  : ['', Validators.required],
      tableData: this.formBuilder.array([
        this.createTableRow()
      ])
    });
  }

  onSubmit() {
    if (this.applyForm) {
      console.log('Form submitted:', this.applyForm.value, this.applyForm.valid);
    } else {
      console.log('Form is invalid. Please fill in all required fields.');
    }
  }

  get tableData() {
    return this.applyForm.get('tableData') as FormArray;
  }

  createTableRow(): FormGroup {
    return this.formBuilder.group({
      dbName: ['', Validators.required],
      sapCompanyName: ['', Validators.required],
      status: [false]
    });
  }

  addRow() {
    this.tableData.push(this.createTableRow());
  }

  deleteRow(index: number) {
    this.tableData.removeAt(index);
  }
}