import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatMenuModule} from '@angular/material/menu';
import { MatIconModule} from '@angular/material/icon'
import { RouterModule } from '@angular/router';
import { TopNavBarComponent} from "./topNavBar/topNavBar.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatIconModule,
    MatMenuModule,
    RouterModule,

  ],
  declarations: [
   TopNavBarComponent,
  ],
  exports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatIconModule,
    MatMenuModule,
    RouterModule,
    TopNavBarComponent

  ]
})
export class WidgetsModule {}
