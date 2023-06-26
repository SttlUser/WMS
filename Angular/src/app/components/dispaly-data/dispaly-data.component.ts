import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dispaly-data',
  templateUrl: './dispaly-data.component.html',
  styleUrls: ['./dispaly-data.component.css']
})
export class DispalyDataComponent {

  constructor(private router: Router,){
    const err = JSON.parse(localStorage.getItem('error') || '{}');
    if (err.code !== 0) {
      console.log("Error", err);
      this.router.navigate(['/login']);
    }
  }
  GotoRoleMaster(){
    this.router.navigate(['/role-master'])
  }

}
