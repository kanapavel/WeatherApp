import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../../core/services/weather.service';
import { Skeleton } from 'primeng/skeleton';
import { NgIf } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-section-two',
  standalone: true,
  imports: [Skeleton,NgIf,TranslatePipe],
  templateUrl: './section-two.component.html',
  styleUrl: './section-two.component.css'
})
export class SectionTwoComponent implements OnInit{
  isLoading:boolean;
  constructor(public weatherService:WeatherService){}

  ngOnInit(): void {
    this.weatherService.dataLoaded$.subscribe(loaded => {
      this.isLoading = !loaded; // Inversez la valeur pour indiquer le chargement
    });
  }
}
