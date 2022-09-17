import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewOfferStepTwoComponent } from './new-offer-step-two.component';

describe('NewOfferStepTwoComponent', () => {
  let component: NewOfferStepTwoComponent;
  let fixture: ComponentFixture<NewOfferStepTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewOfferStepTwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewOfferStepTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
