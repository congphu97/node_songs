import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizationAlbumComponent } from './visualization-album.component';

describe('VisualizationAlbumComponent', () => {
  let component: VisualizationAlbumComponent;
  let fixture: ComponentFixture<VisualizationAlbumComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VisualizationAlbumComponent]
    });
    fixture = TestBed.createComponent(VisualizationAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
