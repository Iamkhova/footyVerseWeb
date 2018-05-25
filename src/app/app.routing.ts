import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {FullLayoutComponent} from "./layouts/full-layout/full-layout.component";
import {SimpleLayoutComponent} from "./layouts/simple-layout/simple-layout.component";

export const routes: Routes = [
  { path: '',
    component: SimpleLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: './pages/login/login-module#LoginModule'
      }]
  }
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
