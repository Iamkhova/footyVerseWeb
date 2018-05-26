import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../service/core/auth.service";
import {Router, Params} from "@angular/router";


@Component({
  selector: 'app-login-page',
  templateUrl: 'login.component.html',
  styleUrls :  ['./login.component.css']

})
export class LoginComponent implements  OnInit {

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit() {}

  tryGoogleLogin(){
    this.authService.doGoogleLogin()
      .then(res => {
        this.router.navigate(['fv']);
      })
  }
}
