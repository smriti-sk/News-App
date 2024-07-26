import { Component, EventEmitter, Output } from '@angular/core';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-topic-ribbon',
  standalone: true,
  imports: [MatTabsModule],
  templateUrl: './topic-ribbon.component.html',
  styleUrls: ['./topic-ribbon.component.scss']
})
export class TopicRibbonComponent {
  topics = ['All', 'Trending', 'Business', 'Politics', 'Technology', 'Education', 'Religious', 'Sports', 'Entertainment', 'World', 'Lifestyle', 'Agriculture'];

  tabSelected: string = ''; // Two-way data binding property

  // @Output() tabSelectedEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output() tabSelectedEvent = new EventEmitter<string>();

  onTabSelected(event: MatTabChangeEvent) {
    console.log("Tab selected");
    const selectedIndex = event.index;
    const selectedLabel = this.topics[selectedIndex];
    // this.tabSelected = selectedLabel;
    this.tabSelectedEvent.emit(selectedLabel);
    console.log("Tab selected", selectedLabel);
    
  }
}
