import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizationSpacemanComponent } from './visualization-spaceman.component';

describe('VisualizationSpacemanComponent', () => {
  let component: VisualizationSpacemanComponent;
  let fixture: ComponentFixture<VisualizationSpacemanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizationSpacemanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizationSpacemanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
