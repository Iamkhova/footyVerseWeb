import { Component } from '@angular/core';
import { Angulartics2GoogleTagManager } from 'angulartics2/gtm';

@Component({
  selector: 'body',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent {
  constructor(angulartics2GoogleTagManager: Angulartics2GoogleTagManager) {}
  title = 'app';
}
