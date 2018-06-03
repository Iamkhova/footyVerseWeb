//<editor-fold desc="@Angular Imports">
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

//</editor-fold>

//<editor-fold desc="External Imports">
import * as Raven from 'raven-js';
import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleTagManager } from 'angulartics2/gtm';
import { AppComponent } from './app.component';
import { AdsenseModule } from 'ng2-adsense';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MatMenuModule} from '@angular/material/menu';
import { MatIconModule} from '@angular/material/icon'
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';

//</editor-fold>

//<editor-fold desc="Footyverse Imports">
import {FullLayoutComponent} from './layouts/full-layout/full-layout.component';
import {SimpleLayoutComponent} from "./layouts/simple-layout/simple-layout.component";
import {AppRoutingModule} from './app.routing';
import {AuthGuard} from "./service/core/auth.guard";
import {AuthService} from "./service/core/auth.service";
import { environment } from '../environments/environment';
import { WidgetsModule} from "./widgets/widgets.module";

import {UserAccountService} from "./service/userAccount/userAccount.service";

//</editor-fold>

Raven
  .config(environment.sentryDSN)
  .install();

export class RavenErrorHandler implements ErrorHandler {
  handleError(err:any) : void {
    Raven.captureException(err);
  }
}

@NgModule({
  declarations: [
    AppComponent,
    FullLayoutComponent,
    SimpleLayoutComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    MatMenuModule,
    MatIconModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    Angulartics2Module.forRoot([ Angulartics2GoogleTagManager ]),
    AdsenseModule.forRoot({
      adClient: environment.adClient,
      pageLevelAds: true
    }),
    WidgetsModule
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy},
    AuthGuard,
    AuthService,
    UserAccountService,
    { provide: ErrorHandler, useClass: RavenErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
platformBrowserDynamic().bootstrapModule(AppModule);
