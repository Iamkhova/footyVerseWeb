import { Component, OnInit} from "@angular/core";
import { AuthService} from "../../service/core/auth.service";


@Component({
  selector: 'app-topNavBar-widget',
  templateUrl: './topNavBar.component.html',
  styleUrls: ['./topNavBar.component.css']
})

export class TopNavBarComponent implements  OnInit {


  constructor (public auth : AuthService) {}

  ngOnInit() {}

  logOff() {
    this.auth.signOut();
  }
}
