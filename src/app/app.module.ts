import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleTagManager } from 'angulartics2/gtm';
import { AppComponent } from './app.component';
import { AdsenseModule } from 'ng2-adsense';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';


import {FullLayoutComponent} from './layouts/full-layout/full-layout.component';
import {SimpleLayoutComponent} from "./layouts/simple-layout/simple-layout.component";
import {AppRoutingModule} from './app.routing';

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
    Angulartics2Module.forRoot([ Angulartics2GoogleTagManager ]),
    AdsenseModule.forRoot({
      adClient: 'ca-pub-1686891852898803',
      pageLevelAds: true
    }),
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
platformBrowserDynamic().bootstrapModule(AppModule);
