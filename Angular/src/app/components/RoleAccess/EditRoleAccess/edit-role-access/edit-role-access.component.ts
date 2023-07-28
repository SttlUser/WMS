import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CustomerService } from 'src/app/customer.service';
import { ToastService } from 'src/app/components/toast/toast.service';
import { ToastComponent } from 'src/app/components/toast/toast.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';


@Component({
	selector: 'app-edit-role-access',
	templateUrl: './edit-role-access.component.html',
	styleUrls: ['./edit-role-access.component.css']
})
export class EditRoleAccessComponent implements OnInit {
	isLoggedIn: boolean = true;
	roleForm!: FormGroup;
	@Output() close = new EventEmitter<void>();
	Accessdata: any;
	role_id: any;
	id: any;
	checkboxValues: { [key: string]: boolean } = {};
	rbacCheckboxArr: number[] = [];
	defaultSelectedRoles: number[] = [];
	checkboxValuesbool: boolean[] = [];
	Access = [{ "id": 0, "value": "Full Access" }, { "id": 1, "value": "No Access" }];
	showNavbar: boolean = true;
	ngOnInit() {
		this.route.queryParams.subscribe(params => {
			this.id = params['id'];
		});

	}

	constructor(private router: Router, private resto: CustomerService, private formBuilder: FormBuilder, public http: HttpClient, private route: ActivatedRoute, private toastService: ToastService, private snackBar: MatSnackBar, private location: Location) {
		this.GetAccessData(http);
		//this.initializeCheckboxes();


		const err = JSON.parse(localStorage.getItem('error') || '{}');
		if (err.code !== 0) {
			console.log("Error", err);
			this.router.navigate(['/login']);
			// console.log(this.data);
		}
		//for navbar hiding
		router.events.subscribe(
			(val) => {
				if (val instanceof NavigationEnd) {
					if (val.url == '/edit-role-access') {
						this.showNavbar = true;
					}
				}
			}
		)
	}



	initializeCheckboxes() {
		this.roleForm = this.formBuilder.group({});
		this.rbacCheckboxArr = this.defaultSelectedRoles; // Initialize the rbacCheckboxArr first
	  
		this.Accessdata.forEach((_rol: any, i: number) => {
		  const checkboxValue = this.defaultSelectedRoles.includes(i);
		  this.roleForm.addControl(`checkbox_${i}`, new FormControl(checkboxValue));
		});
	  
		console.log(this.rbacCheckboxArr);
	  }

	GetAccessData(http: HttpClient) {
		this.route.queryParams.subscribe(params => {
			this.id = params['id'];
		})
		this.resto.GetRoleAccessData(this.id).subscribe(
			(response: any) => {
				console.log("received table data", response);
				this.Accessdata = response;
				response.forEach((i: { roleid: any; documentid: number; }) => {
					if (String(i.roleid) === String(this.id)) {
						this.defaultSelectedRoles.push(i.documentid);
					}
					
				});
				this.initializeCheckboxes();
			},
			(error) => {
				console.error('Error retrieving data:', error);
				const message = 'Something went wrong.';
				this.snackBar.openFromComponent(ToastComponent, {
					data: { message },
					duration: 2000, // Toast duration in milliseconds
					horizontalPosition: 'end',
					verticalPosition: 'top'
				});
			}
		);
	}
	onCheckboxChange(documentId: number) {
		console.log(documentId);
		//console.log(this.rbacCheckboxArr);
		if (!this.rbacCheckboxArr.includes(documentId)) {
		  this.rbacCheckboxArr.push(documentId); // Add the documentId to the array
		} else {
		  this.rbacCheckboxArr = this.rbacCheckboxArr.filter((id) => id !== documentId); // Remove the documentId from the array
		}
		console.log(this.rbacCheckboxArr);
	  }
	  
	
	  
	rbacCheckBox(rol: any) {
		this.role_id = rol.roleid;

		if (rol.checked) {
			this.rbacCheckboxArr.push(rol.documentid);
			console.log('Checked');
		}
		else {
			const index = this.rbacCheckboxArr.indexOf(rol.documentid);
			if (index !== -1) {
				this.rbacCheckboxArr.splice(index, 1);
			} else {
				const minusOneIndex = this.rbacCheckboxArr.indexOf(-1);
				if (minusOneIndex !== -1) {
					this.rbacCheckboxArr.splice(minusOneIndex, 1);
				}
			}
			console.log('Unchecked');
			this.checkboxValues[rol.documentid] = rol.checked;
			console.log(this.rbacCheckboxArr);
		}
	}


	CloseBtn() {
		// this.router.navigate(['/RoleAccessList']);
		this.location.back();
	}

	PostrbacData() {


		const defaultSet = new Set(this.defaultSelectedRoles);
		this.rbacCheckboxArr = Array.from(
			new Set([
				...this.rbacCheckboxArr.filter((id) => defaultSet.has(id)),
				...defaultSet,
			])
		);

		console.log("roleid", this.rbacCheckboxArr);
		this.resto.PostRoleAccessData(this.id, this.rbacCheckboxArr).subscribe(
			(res) => {
				console.log(this.id, this.rbacCheckboxArr);
				console.log(res);
				const message = 'Data Posted Successfully';
				this.snackBar.openFromComponent(ToastComponent, {
					data: { message },
					duration: 2000, // Toast duration in milliseconds
					horizontalPosition: 'end',
					verticalPosition: 'top'
				});
				// this.toastService.recieve(this.edit_role_access_posted);
				this.router.navigate(['/RoleAccessList'])
			},
			(err) => {
				console.log(err);
				const message = 'Something went wrong.';
				this.snackBar.openFromComponent(ToastComponent, {
					data: { message },
					duration: 2000, // Toast duration in milliseconds
					horizontalPosition: 'end',
					verticalPosition: 'top'
				});
			}
		)
	}
}
