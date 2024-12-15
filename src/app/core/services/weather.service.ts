import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocationDetails } from '../models/LocationDetails';
import { WeatherDetails } from '../models/WeatherDetails';
import { TemperatureData } from '../models/TemperatureData';
import { TodayData } from '../models/TodayData';
import { WeekData } from '../models/WeekData';
import { TodaysHighlight } from '../models/TodaysHighlight';
import { Observable,BehaviorSubject } from 'rxjs';
import { EnvironmentVariables } from '../../environment/EnvironmentVariables';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  locationDetails?:LocationDetails;
  weatherDetails?:WeatherDetails;
  
  temperatureData:TemperatureData;
  todayData?:TodayData[];
  weekData?:WeekData[];
  
  todaysHighLight?:TodaysHighlight;
  
  cityName:string = 'douala';
  language:string = 'en-Us';
  date:string = '20200622';
  units:string = 'm';

  currentTime:Date;

  //variable to control tab
  today:boolean=false;
  week:boolean=true;

  celcius = true;
  fahrenheit = false;

  public dataLoadedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public dataLoaded$: Observable<boolean> = this.dataLoadedSubject.asObservable();

  constructor(private http:HttpClient) {
    this.getData();
  }

  getSummaryImage(summary:string):string{
    //base folser address containing the images
    let baseAddress = 'assets/';

    //respective images names
    let cloudySunny ='img5.png';
    let rainSunny = 'img10.jpg'
    let windy = 'img0.png';
    let sunny = 'img3.png';
    let rainy = 'img1.png'

    if(String(summary).includes("Partly Cloudy") || String(summary).includes("P Cloudy")){
      return baseAddress+cloudySunny;
    }else if(String(summary).includes("Partly rainy") || String(summary).includes("P rainy")){
      return baseAddress+rainSunny;
    }else if(String(summary).includes("wind")){
      return baseAddress+windy;
    }else if(String(summary).includes("rain")){
      return baseAddress+rainy;
    }else if(String(summary).includes("sun")){
      return baseAddress+sunny;
    }

    return baseAddress+cloudySunny;
  }

  //method  to get create a chunk for left contenair using model temperatureData 
  fillTemparatureDataModel(){
    this.currentTime = new Date();
    this.temperatureData.day = this.weatherDetails['v3-wx-observations-current'].dayOfWeek;
    this.temperatureData.time = `${String(this.currentTime.getHours()).padStart(2,'0')}:${String(this.currentTime.getMinutes()).padStart(2,'0')}`
    this.temperatureData.temperature = this.weatherDetails['v3-wx-observations-current'].temperature;
    this.temperatureData.location = `${this.locationDetails.location.city[0]},${this.locationDetails.location.country[0]}`;
    this.temperatureData.rainPercent = this.weatherDetails['v3-wx-observations-current'].precip24Hour;
    this.temperatureData.summaryPhrase = this.weatherDetails['v3-wx-observations-current'].wxPhraseShort;
    this.temperatureData.summaryImage = this.getSummaryImage(this.temperatureData.summaryPhrase);
  }

   //method  to get create a chunk for left contenair using model temperatureData
   fillWeekData(){
    let weekCount = 0;

    while(weekCount<7){
      this.weekData.push(new WeekData());
      this.weekData[weekCount].day = this.weatherDetails['v3-wx-forecast-daily-15day'].dayOfWeek[weekCount].slice(0,3);
      this.weekData[weekCount].tempMax = this.weatherDetails['v3-wx-forecast-daily-15day'].calendarDayTemperatureMax[weekCount];
      this.weekData[weekCount].tempMin = this.weatherDetails['v3-wx-forecast-daily-15day'].calendarDayTemperatureMin[weekCount];
      this.weekData[weekCount].summaryImage = this.getSummaryImage(this.weatherDetails['v3-wx-forecast-daily-15day'].narrative[weekCount]);

      weekCount++;
    }
   }

   fillTodayData(){
    let todayCount = 0;
    while(todayCount<7){
      this.todayData.push(new TodayData());
      this.todayData[todayCount].time = this.weatherDetails['v3-wx-forecast-hourly-10day'].validTimeLocal[todayCount].slice(11,16);
      this.todayData[todayCount].temperature = this.weatherDetails['v3-wx-forecast-hourly-10day'].temperature[todayCount];
      this.todayData[todayCount].summaryImage = this.getSummaryImage(this.weatherDetails['v3-wx-forecast-hourly-10day'].wxPhraseShort[todayCount]);

      todayCount++;
    }
   }

   getTimeFromString(localTime:string){
    return localTime.slice(12,16);
   }

   //metthod to get todayHighLight data from the base variable
   fillTodaysHighLight(){
    this.todaysHighLight.airQuality = this.weatherDetails['v3-wx-globalAirQuality'].globalairquality.airQualityIndex;
    this.todaysHighLight.humidity = this.weatherDetails['v3-wx-observations-current'].relativeHumidity;
    this.todaysHighLight.sunrise = this.getTimeFromString(this.weatherDetails['v3-wx-observations-current'].sunriseTimeLocal);
    this.todaysHighLight.sunset = this.getTimeFromString(this.weatherDetails['v3-wx-observations-current'].sunsetTimeLocal);
    this.todaysHighLight.uvIndex = this.weatherDetails['v3-wx-observations-current'].uvIndex;
    this.todaysHighLight.visibility = this.weatherDetails['v3-wx-observations-current'].visibility;
    this.todaysHighLight.windStatus = this.weatherDetails['v3-wx-observations-current'].windSpeed;
   }

  //method to create useful data chunks for ut using data received from api
  prepareData():void{
    //setting left contenair date model properties
    this.fillTemparatureDataModel()
    this.fillWeekData();
    this.fillTodayData();
    this.fillTodaysHighLight();
    
    console.log(this.temperatureData);
    console.log(this.weekData);
    console.log(this.todayData);
    console.log(this.todaysHighLight);
    
    
  }

  celsiusToFahrenheit(celsius:number){
    return ((celsius * 1.8) + 32).toFixed(1);
  }

  fahrenheitToCelsius(fahrenheit){
    return ((fahrenheit - 32) * 0.5).toFixed(1);
  }

  //method to get location details from api using the variable cityName as the Input
  getLocationDetails(cityName:string,language:string,):Observable<LocationDetails>{
    return this.http.get<LocationDetails>(EnvironmentVariables.weatherApiLocationBaseURL,{
      headers:new HttpHeaders()
      .set(EnvironmentVariables.xRapidApikeyName,EnvironmentVariables.xRapidApikeyValue)
      .set(EnvironmentVariables.xRapidApiHostName,EnvironmentVariables.xRapidApiHostValue),
      params: new HttpParams()
      .set('query',cityName)
      .set('language',language)
    });
  }

  getWeatherReport(date:string,latitude:number,longitude:number,language:string,units:string,):Observable<WeatherDetails>{
    return this.http.get<WeatherDetails>(EnvironmentVariables.weatherApiForecastBaseURL,{
      headers:new HttpHeaders()
      .set(EnvironmentVariables.xRapidApikeyName,EnvironmentVariables.xRapidApikeyValue)
      .set(EnvironmentVariables.xRapidApiHostName,EnvironmentVariables.xRapidApiHostValue),
      params: new HttpParams()
      .set('date',date)
      .set('latitude',latitude)
      .set('longitude',longitude)
      .set('language',language)
      .set('units',units)
    });
  }

  getData() {
    this.todayData = [];
    this.weekData = [];
    this.temperatureData = new TemperatureData();
    this.todaysHighLight = new TodaysHighlight();

    let latitude = 0;
    let longitude = 0;

    this.getLocationDetails(this.cityName, this.language).subscribe({
      next: (response) => {
        this.locationDetails = response;

        // Vérifiez si les coordonnées sont disponibles
        if (this.locationDetails?.location.latitude && this.locationDetails?.location.longitude) {
          latitude = this.locationDetails.location.latitude[0];
          longitude = this.locationDetails.location.longitude[0];

          this.getWeatherReport(this.date, latitude, longitude, this.language, this.units).subscribe({
            next: (weatherResponse) => {
              this.weatherDetails = weatherResponse;
              this.prepareData();
              this.dataLoadedSubject.next(true); // Données chargées avec succès
            },
            error: (weatherError) => {
              console.error('Erreur lors de la récupération des données météo:', weatherError);
              this.dataLoadedSubject.next(false); // Indique que les données n'ont pas pu être chargées
            }
          });
        } else {
          console.error('Coordonnées non disponibles dans la réponse de localisation.');
          this.dataLoadedSubject.next(false); // Indique que les données n'ont pas pu être chargées
        }
      },
      error: (locationError) => {
        console.error('Erreur lors de la récupération des détails de localisation:', locationError);
        this.dataLoadedSubject.next(false); // Indique que les données n'ont pas pu être chargées
      }
    });
  }
}
