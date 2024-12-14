import { NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { WeatherService } from '../../../core/services/weather.service';

@Component({
  selector: 'app-section-one',
  standalone: true,
  imports: [NgIf,NgFor],
  templateUrl: './section-one.component.html',
  styleUrl: './section-one.component.css'
})
export class SectionOneComponent implements OnInit{
  @Input()today!:boolean;

  constructor(public weatherService:WeatherService){}

  ngOnInit(): void {
    this.today =  false
  }
}
