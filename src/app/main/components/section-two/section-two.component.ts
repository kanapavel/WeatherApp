import { Component } from '@angular/core';
import { WeatherService } from '../../../core/services/weather.service';

@Component({
  selector: 'app-section-two',
  standalone: true,
  imports: [],
  templateUrl: './section-two.component.html',
  styleUrl: './section-two.component.css'
})
export class SectionTwoComponent {
  constructor(public weatherService:WeatherService){}
}
