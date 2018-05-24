import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleTagManager } from 'angulartics2/gtm';
import { AppComponent } from './app.component';
import { AdsenseModule } from 'ng2-adsense';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {FullLayoutComponent} from './layouts/full-layout.component';
import {AppRoutingModule} from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    FullLayoutComponent,
  ],
  imports: [
    BrowserModule,
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
