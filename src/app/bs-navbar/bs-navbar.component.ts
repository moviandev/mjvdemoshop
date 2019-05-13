import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';


@Component({
// tslint:disable-next-line: component-selector
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {

  public isCollapsed = true;

  constructor(public auth: AuthService) { }

  logOut(){
    this.auth.logOut();
  }

}
