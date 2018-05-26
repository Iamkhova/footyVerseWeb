import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from "./service/core/auth.guard.";

import {FullLayoutComponent} from "./layouts/full-layout/full-layout.component";
import {SimpleLayoutComponent} from "./layouts/simple-layout/simple-layout.component";

const homePath = './pages/dashboard/dashboard.module#DashboardModule';
const loginPath = './pages/login/login.module#LoginModule';

export const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: SimpleLayoutComponent,loadChildren: loginPath,  canActivate: [AuthGuard]},
  { path: 'fv', component: FullLayoutComponent,
    children: [
      { path: 'home', loadChildren: homePath}
      ]
  }

]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
