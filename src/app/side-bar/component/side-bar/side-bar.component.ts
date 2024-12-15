import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../../core/services/weather.service';
import { Skeleton } from 'primeng/skeleton';
import { NgIf } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [Skeleton,NgIf,TranslatePipe],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent implements OnInit{
  isLoading:boolean;
  constructor(public weatherService:WeatherService){}

  ngOnInit(): void {
    this.weatherService.dataLoaded$.subscribe(loaded => {
      this.isLoading = !loaded; // Inversez la valeur pour indiquer le chargement
    });
  }

  onSearch(location:string){
    this.weatherService.cityName = location;
    this.weatherService.getData();
  }
}
