import { NgClass, TitleCasePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { WeatherService } from '../core/services/weather.service';
import { LanguageService } from '../core/services/translate.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [NgClass,TitleCasePipe,TranslatePipe],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit {
  userLanguage!:string;
  suppotedLanguage:string[]=[];

  english: string = "english";
  chinese: string = "chinese";
  swahili: string = "swahili";
  french: string = "french";
  
  constructor(private languageService:LanguageService,public weatherService:WeatherService){

  }
  
  ngOnInit(): void {
    this.userLanguage = this.languageService.getUserLanguage()
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
    this.weatherService.dataLoadedSubject.next(false);
    this.weatherService.getData();
  }
  onChangeLanguage(language:string):void{
    this.languageService.setLanguage(language)
    this.userLanguage = language
  }
}
