import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicItemsComponent } from './music-items.component';

describe('MusicItemsComponent', () => {
  let component: MusicItemsComponent;
  let fixture: ComponentFixture<MusicItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MusicItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
