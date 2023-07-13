import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  showNavbar: boolean=true;

  constructor(private router:Router){
        //for navbar hiding
        router.events.subscribe(
          (val)=>{
            if(val instanceof NavigationEnd){
              if(val.url=='/home'){
                this.showNavbar=true;
              }
            }
          }
        )
  }
}
