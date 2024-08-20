import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StickyPlayerComponent } from './sticky-player.component';

describe('StickyPlayerComponent', () => {
  let component: StickyPlayerComponent;
  let fixture: ComponentFixture<StickyPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StickyPlayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StickyPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
