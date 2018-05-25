import { Component, OnInit } from '@angular/core';
import { Angulartics2GoogleTagManager } from 'angulartics2/gtm';

@Component({
  selector: 'app-dashboard',
  templateUrl: './simple-layout.component.html'
})
export class SimpleLayoutComponent implements OnInit {
  constructor(angulartics2GoogleTagManager: Angulartics2GoogleTagManager) {}
  ngOnInit(): void {}
}
