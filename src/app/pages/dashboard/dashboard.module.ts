import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

//Components

//Modules

import { DashboardRoutingModule} from './dashboard-routing.module';
import { DashboardComponent} from './dashboard.component';


@NgModule({
  imports: [ DashboardRoutingModule, RouterModule, CommonModule ],
  declarations: [
    DashboardComponent,
  ],

})
export class DashboardModule { }
