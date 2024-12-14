import { Component } from '@angular/core';
import { WeatherService } from '../../../core/services/weather.service';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {

  constructor(public weatherService:WeatherService){}

  onSearch(location:string){
    this.weatherService.cityName = location;
    this.weatherService.getData();
  }
}
