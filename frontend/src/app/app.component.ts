import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { NavBarComponent } from './components/nav/nav-bar/nav-bar.component';
import { NewsSectionComponent } from './components/news-section/news-section.component';
import { TopicRibbonComponent } from "./components/topics/topic-ribbon/topic-ribbon.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatIconModule,
    NavBarComponent, NewsSectionComponent, FooterComponent, TopicRibbonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'news app';
}
