import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleTagManager } from 'angulartics2/gtm';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';

const ROUTES: Routes = [
  { path: '',      component: AppComponent },
  { path: 'about', component: AppComponent },
];


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    Angulartics2Module.forRoot([ Angulartics2GoogleTagManager ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
