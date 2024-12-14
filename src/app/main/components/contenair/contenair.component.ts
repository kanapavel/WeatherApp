import { Component } from '@angular/core';
import { SectionOneComponent } from '../section-one/section-one.component';
import { SectionTwoComponent } from '../section-two/section-two.component';
import { NavBarComponent } from '../../../nav-bar/nav-bar.component';
import { WeatherService } from '../../../core/services/weather.service';

@Component({
  selector: 'app-contenair',
  standalone: true,
  imports: [SectionOneComponent,SectionTwoComponent,NavBarComponent],
  templateUrl: './contenair.component.html',
  styleUrl: './contenair.component.css'
})
export class ContenairComponent {
  change!:boolean

  constructor(private weatherService:WeatherService){}

  onChange(e:boolean){
    this.change = e
  }
}
