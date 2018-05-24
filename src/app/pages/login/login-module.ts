import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

//Components

//Modules

import { LoginRoutingModule} from './login-routing.module';
import { LoginComponent} from './login.component';


@NgModule({
  imports: [ LoginRoutingModule, RouterModule, CommonModule ],
  declarations: [
    LoginComponent,
  ],

})
export class LoginModule { }
