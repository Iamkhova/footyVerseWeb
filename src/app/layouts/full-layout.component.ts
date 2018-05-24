import { Component, OnInit } from '@angular/core';
import { Angulartics2GoogleTagManager } from 'angulartics2/gtm';

@Component({
  selector: 'app-dashboard',
  templateUrl: './full-layout.component.html'
})
export class FullLayoutComponent implements OnInit {
  constructor(angulartics2GoogleTagManager: Angulartics2GoogleTagManager) {}
  ngOnInit(): void {}
}
