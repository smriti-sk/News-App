import {Component, EventEmitter, Output} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';


@Component({
  selector: 'app-search-news',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule],
  templateUrl: './search-news.component.html',
  styleUrl: './search-news.component.scss'
})
export class SearchNewsComponent {
  value = 'Clear me';
  searchQuery: string = '';
  @Output() searchQueryEvent = new EventEmitter<string>();

  sendSearchQuery(searchQuery: string) {
    console.log("event emitted");
    
    this.searchQueryEvent.emit(searchQuery);
  }

  
}

