import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewOfferStepFourComponent } from './new-offer-step-four.component';

describe('NewOfferStepFourComponent', () => {
  let component: NewOfferStepFourComponent;
  let fixture: ComponentFixture<NewOfferStepFourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewOfferStepFourComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewOfferStepFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
