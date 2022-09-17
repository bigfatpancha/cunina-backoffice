import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewOfferStepOneComponent } from './new-offer-step-one.component';

describe('NewOfferStepOneComponent', () => {
  let component: NewOfferStepOneComponent;
  let fixture: ComponentFixture<NewOfferStepOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewOfferStepOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewOfferStepOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
