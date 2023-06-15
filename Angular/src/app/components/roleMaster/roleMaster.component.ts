import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-role-master',
  templateUrl: './rolemaster.component.html',
  styleUrls: ['./rolemaster.component.css']
})
export class RoleMasterComponent {

  constructor(private router: Router) {
    let item = [{ "id": 1, "name": "admin" }, { "id": 2, "name": "user" }]
    const err = JSON.parse(localStorage.getItem('error') || '{}');

    if (err.code !== 0) {
      console.log("Error", err);
      this.router.navigate(['/login']);
    }
  }
}
