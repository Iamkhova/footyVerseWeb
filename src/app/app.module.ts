//<editor-fold desc="@Angular Imports">
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
//</editor-fold>

//<editor-fold desc="External Imports">
import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleTagManager } from 'angulartics2/gtm';
import { AppComponent } from './app.component';
import { AdsenseModule } from 'ng2-adsense';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
//</editor-fold>

//<editor-fold desc="Footyverse Imports">
import {FullLayoutComponent} from './layouts/full-layout/full-layout.component';
import {SimpleLayoutComponent} from "./layouts/simple-layout/simple-layout.component";
import {AppRoutingModule} from './app.routing';
import {AuthGuard} from "./service/core/auth.guard.";
import {AuthService} from "./service/core/auth.service";
import {UserService} from "./service/core/user.service";
import {UserResolver} from "./service/core/user.resolver";
import { environment } from '../environments/environment';
//</editor-fold>

@NgModule({
  declarations: [
    AppComponent,
    FullLayoutComponent,
    SimpleLayoutComponent
  ],
  imports: [
    BrowserModule,
    BrowserModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    AppRoutingModule,
    NgbModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    Angulartics2Module.forRoot([ Angulartics2GoogleTagManager ]),
    AdsenseModule.forRoot({
      adClient: environment.adClient,
      pageLevelAds: true
    }),
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy},
    AuthGuard,
    AuthService,
    UserResolver,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
platformBrowserDynamic().bootstrapModule(AppModule);
