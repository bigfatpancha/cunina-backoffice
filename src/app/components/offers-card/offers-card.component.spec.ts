import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffersCardComponent } from './offers-card.component';

describe('OffersCardComponent', () => {
  let component: OffersCardComponent;
  let fixture: ComponentFixture<OffersCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OffersCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OffersCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
