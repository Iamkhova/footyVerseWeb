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
    this.authService.googleLogin()
      .then(res => {
        console.log('Google Login Success');
        this.router.navigate(['/fv']);
      }).catch( error => {
        console.log('something went wrong', error)
    })
  }

  tryFacebookLogin(){
    this.authService.facebookLogin()
      .then(res => {
        console.log('Facebook Login Success');
        this.router.navigate(['/fv']);
      }).catch( error => {
      console.log('something went wrong', error)
    })
  }


}
