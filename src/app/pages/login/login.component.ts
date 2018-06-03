import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../service/core/auth.service";
import {Router, Params} from "@angular/router";
import { FormBuilder} from "@angular/forms";
import { FormGroup, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-login-page',
  templateUrl: 'login.component.html',
  styleUrls :  ['./login.component.css']

})
export class LoginComponent implements  OnInit {

  loginForm: FormGroup;

  constructor(public authService: AuthService, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup( {
      emailAddress: new FormControl(),
      password: new FormControl()
    })
  }

  tryGoogleLogin(){
    this.authService.googleLogin()
      .then(res => {
        console.log('Google Processing');
        this.router.navigate(['/fv']);
      }).catch( error => {
        console.log('something went wrong', error)
    })
  }

  tryFacebookLogin(){
    this.authService.facebookLogin()
      .then(res => {
        console.log('Facebook Processing');
        this.router.navigate(['/fv']);
      }).catch( error => {
      console.log('something went wrong', error)
    })
  }

  tryEmailLogin(){
    const userName = this.loginForm.controls['emailAddress'].value;
    const password = this.loginForm.controls['password'].value;

    this.authService.emailLogin(userName, password)
      .then(res => {
        console.log('Email Processing');
        this.router.navigate(['/fv']);
      }).catch( error => {
      console.log('something went wrong', error)
    })
  }


}
