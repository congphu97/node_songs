import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizationYoutubeComponent } from './visualization-youtube.component';

describe('VisualizationYoutubeComponent', () => {
  let component: VisualizationYoutubeComponent;
  let fixture: ComponentFixture<VisualizationYoutubeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VisualizationYoutubeComponent]
    });
    fixture = TestBed.createComponent(VisualizationYoutubeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
