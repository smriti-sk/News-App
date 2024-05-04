import { Component,NgZone,OnInit } from '@angular/core';
import { NewsData, NewsSectionInterface } from './news-section.interface';
import {MatGridListModule} from '@angular/material/grid-list';
import { SCREENSIZE } from './news.enums';
import { LAPTOP_GRID, MOBILE_GRID, tempData } from './news.const';
import { NewsService } from '../../services/newsSection/news.service';
import { SearchNewsComponent } from './search-news/search-news.component';
import { NgIf } from '@angular/common';
import { TopicRibbonComponent } from '../topics/topic-ribbon/topic-ribbon.component';

@Component({
  selector: 'app-news-section',
  standalone: true,
  imports: [MatGridListModule, NgIf, SearchNewsComponent, TopicRibbonComponent],
  templateUrl: './news-section.component.html',
  styleUrl: './news-section.component.scss'
})
export class NewsSectionComponent implements OnInit{
  screenSize = SCREENSIZE.LARGE;
  private largeScreenMatch!: MediaQueryList;
  private mediumScreenMatch!: MediaQueryList;
  private smallScreenMatch!: MediaQueryList;
  private updateScreenSize!: () => void; // Declare the function as a property to keep context
  newsSections: NewsSectionInterface[]= MOBILE_GRID;
  newsSectionGrid: NewsSectionInterface[]= MOBILE_GRID;
  articles!: NewsData[];
  article!: NewsData;
  constructor(private ngZone: NgZone, private newsService: NewsService) {}

  ngOnInit() {
    this.setupScreenSizeWatcher();
    console.log("screensize: ",this.screenSize)
    this.getNews();
    console.log("newsSections: ",this.newsSections)
  } 

  getNews() {
    const requestBody = {
      // Define your request body here
      category: 'business',
      country: 'us',
      language: 'en'
    };
    this.newsService.getNews(requestBody).subscribe(
      (response) => {
        this.articles = response.results;
        this.updateGridTiles(this.articles.length);
        console.log(this.articles);
      }
    );
  }

  updateGridTiles(totalArticles: number) {
    this.newsSectionGrid = [];
    // Loop through the 'newsSection' constant till totalArticles is reached
    for (let i = 0; i < totalArticles && i < this.newsSections.length; i++) {
      this.newsSectionGrid.push(this.newsSections[i]);
    }
  }

  handleSearchQuery(searchQuery: string) {
    console.log('Value received from child:', searchQuery);
    this.newsService.SearchQueryBasedNews(searchQuery).subscribe(
      (response) => {
        this.articles = response.results;
        this.updateGridTiles(this.articles.length);
        console.log(this.articles);
      }
    );
  }

  setupScreenSizeWatcher() {
    this.largeScreenMatch = window.matchMedia('(min-width: 992px)');
    this.mediumScreenMatch = window.matchMedia('(min-width: 768px) and (max-width: 991px)');
    this.smallScreenMatch = window.matchMedia('(max-width: 767px)');

    this.updateScreenSize = () => {
      this.ngZone.run(() => {
        if (this.largeScreenMatch.matches) {
          this.screenSize = SCREENSIZE.LARGE;
        } else if (this.mediumScreenMatch.matches) {
          this.screenSize = SCREENSIZE.MEDIUM;
        } else if (this.smallScreenMatch.matches) {
          this.screenSize = SCREENSIZE.SMALL;
        }
      });
      console.log("screensiz lalae: ",this.screenSize)
      if (this.screenSize === SCREENSIZE.SMALL){
        console.log("Smallllll")
        this.newsSections = MOBILE_GRID;
      }else if (this.screenSize === SCREENSIZE.LARGE){
        console.log("L")
        this.newsSections = LAPTOP_GRID;
      }else {
        console.log("M")
        this.newsSections = LAPTOP_GRID;
      }
    };

    // Initial check
    this.updateScreenSize();

    // Listen for changes
    this.largeScreenMatch.addEventListener('change', this.updateScreenSize);
    this.mediumScreenMatch.addEventListener('change', this.updateScreenSize);
    this.smallScreenMatch.addEventListener('change', this.updateScreenSize);
  }

  ngOnDestroy() {
    // It's important to remove the listeners when the component is destroyed to prevent memory leaks
    this.largeScreenMatch.removeEventListener('change', this.updateScreenSize);
    this.mediumScreenMatch.removeEventListener('change', this.updateScreenSize);
    this.smallScreenMatch.removeEventListener('change', this.updateScreenSize);
  }
}