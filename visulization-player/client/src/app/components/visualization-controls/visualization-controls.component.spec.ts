import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizationControlsComponent } from './visualization-controls.component';

describe('VisualizationControlsComponent', () => {
  let component: VisualizationControlsComponent;
  let fixture: ComponentFixture<VisualizationControlsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VisualizationControlsComponent]
    });
    fixture = TestBed.createComponent(VisualizationControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
