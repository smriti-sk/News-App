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
  searchTerm: string = ''; // Two-way data binding property

  @Output() searchSubmit: EventEmitter<string> = new EventEmitter<string>();

  onSubmit(event: Event) {
    event.preventDefault(); // Prevent form submission
    // const encodedSearchTerm = encodeURIComponent(this.searchTerm);
    this.searchSubmit.emit(this.searchTerm); // Emit the search term to parent component
  }
}

