import { NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { WeatherService } from '../../../core/services/weather.service';
import { Skeleton } from 'primeng/skeleton';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-section-one',
  standalone: true,
  imports: [NgIf,NgFor,Skeleton,TranslatePipe],
  templateUrl: './section-one.component.html',
  styleUrl: './section-one.component.css'
})
export class SectionOneComponent implements OnInit{
  @Input()today!:boolean
  isLoading:boolean;

  constructor(public weatherService:WeatherService){}

  ngOnInit(): void {
    this.today =  false
    this.weatherService.dataLoaded$.subscribe(loaded => {
      this.isLoading = !loaded; // Inversez la valeur pour indiquer le chargement
    });
  }
}
