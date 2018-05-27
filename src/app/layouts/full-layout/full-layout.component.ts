import { Component, OnInit } from '@angular/core';
import { Angulartics2GoogleTagManager } from 'angulartics2/gtm';
import {AuthService} from "../../service/core/auth.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './full-layout.component.html'
})
export class FullLayoutComponent implements OnInit {
  constructor(angulartics2GoogleTagManager: Angulartics2GoogleTagManager,
              private authService: AuthService) {}
  ngOnInit() {}

}
