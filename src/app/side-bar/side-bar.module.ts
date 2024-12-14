import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SideBarRoutingModule } from './side-bar-routing.module';
import { SideBarComponent } from './component/side-bar/side-bar.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SideBarRoutingModule,
    SideBarComponent
  ],
  exports:[SideBarComponent]
})
export class SideBarModule { }
