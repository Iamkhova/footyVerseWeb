import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from "./service/core/auth.guard";
import {RoleGuard} from "./service/core/role.guard";

import {FullLayoutComponent} from "./layouts/full-layout/full-layout.component";
import {SimpleLayoutComponent} from "./layouts/simple-layout/simple-layout.component";

const homePath = './pages/dashboard/dashboard.module#DashboardModule';
const loginPath = './pages/login/login.module#LoginModule';

export const routes: Routes = [

  //canActivate: [AuthGuard]
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: SimpleLayoutComponent,loadChildren: loginPath},
  { path: 'fv', component: FullLayoutComponent, canActivate: [AuthGuard],
    children: [
      { path: 'home', loadChildren: homePath, canActivate: [RoleGuard], data: {roles: ['admin']} }
      ]
  }

]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
