import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicRibbonComponent } from './topic-ribbon.component';

describe('TopicRibbonComponent', () => {
  let component: TopicRibbonComponent;
  let fixture: ComponentFixture<TopicRibbonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopicRibbonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopicRibbonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
