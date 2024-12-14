import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { ContenairComponent } from './components/contenair/contenair.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MainRoutingModule,
    ContenairComponent
  ],
  exports:[
    ContenairComponent
  ]
})
export class MainModule { }
