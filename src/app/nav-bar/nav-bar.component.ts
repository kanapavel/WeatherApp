import { NgClass } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { WeatherService } from '../core/services/weather.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [NgClass],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  
  constructor(public weatherService:WeatherService){

  }
  
  @Output()afficherBloc=new EventEmitter<boolean>();

  onTodayClick(){
    this.weatherService.today = true;
    this.weatherService.week=false;
    this.afficherBloc.emit(this.weatherService.today)
  }
  onWeekClick(){
    this.weatherService.week=true;
    this.weatherService.today =false;
    this.afficherBloc.emit(this.weatherService.today)
  }

  onCelsiusClick(){
    this.weatherService.celcius=true;
    this.weatherService.fahrenheit =false;
  }
  onFahrenheitClik(){
    this.weatherService.fahrenheit=true;
    this.weatherService.celcius=false;
  }

  onSearch(location:string){
    this.weatherService.cityName = location;
    this.weatherService.getData();
  }
}
