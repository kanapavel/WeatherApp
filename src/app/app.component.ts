import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { MainModule } from './main/main.module';
import { SideBarModule } from './side-bar/side-bar.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MainModule,SideBarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'weatherApp';
  ngOnInit(): void {
    initFlowbite();
  }
}
