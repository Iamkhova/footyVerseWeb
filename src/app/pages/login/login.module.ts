import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

//Components

//Modules

import { LoginRoutingModule} from './login-routing.module';
import { LoginComponent} from './login.component';



@NgModule({
  imports: [ LoginRoutingModule, RouterModule, CommonModule, ReactiveFormsModule, FormsModule ],
  declarations: [
    LoginComponent,
  ],

})
export class LoginModule { }
