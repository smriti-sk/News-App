import { Component } from '@angular/core';
import {DAY_AND_DATE_FORMAT} from '../../../constants';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  DAY_AND_DATE_FORMAT = DAY_AND_DATE_FORMAT;
  todayDate: Date = new Date();
  // todayDate: string = new Date().toLocaleDateString('en-US', { weekday: 'long' });
}
