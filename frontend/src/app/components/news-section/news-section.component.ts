import { Component,NgZone,OnInit } from '@angular/core';
import { NewsData, NewsSectionInterface } from './news-section.interface';
import {MatGridListModule} from '@angular/material/grid-list';
import { SCREENSIZE } from './news.enums';
import { LAPTOP_GRID, MOBILE_GRID } from './news.const';
import { NewsService } from '../../services/newsSection/news.service';
import { SearchNewsComponent } from './search-news/search-news.component';
import { NgIf, NgFor, NgClass, NgStyle} from '@angular/common';
import { TopicRibbonComponent } from '../topics/topic-ribbon/topic-ribbon.component';

@Component({
  selector: 'app-news-section',
  standalone: true,
  imports: [MatGridListModule, NgIf, SearchNewsComponent, TopicRibbonComponent, NgFor, NgClass, NgStyle],
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
  articles!: NewsData[];
  article!: NewsData;
  selectedTab!: string;
  
  constructor(private ngZone: NgZone, private newsService: NewsService) {}

  ngOnInit() {
    this.setupScreenSizeWatcher();
    this.getNews();
  }

  onTabSelected(tab: string) {
    this.selectedTab = tab;
    console.log("TAB: ",this.selectedTab);
    
    // Do something with the selected tab
  }

  onSearchSubmit(searchTerm: string) {
    console.log('Search term submitted:', searchTerm);
    this.newsService.searchNews(searchTerm).subscribe(
      (response) => {
        this.articles = response.results;
        let totalArticles = response.results.length;
        for(let i=0; i< totalArticles; i++){
          this.article = this.articles[i];
        }
        
        console.log("SEARCH NEWS:",this.articles);
      }
    );
    // Implement your logic here to handle the search term from the child component
  }

  getNews(){
    const requestBody = {
      // Define your request body here
      category: 'business',
      country: 'us',
      language: 'en'
    };
    this.newsService.getNews(requestBody).subscribe(
      (response) => {
        console.log("GETNEWS")
        this.articles = response.results;
        let totalArticles = response.results.length;
        for(let i=0; i< totalArticles; i++){
          this.article = this.articles[i];
        }
        
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
        this.newsSections = LAPTOP_GRID;
      }else {
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