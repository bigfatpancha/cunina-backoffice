import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewOfferStepThreeComponent } from './new-offer-step-three.component';

describe('NewOfferStepThreeComponent', () => {
  let component: NewOfferStepThreeComponent;
  let fixture: ComponentFixture<NewOfferStepThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewOfferStepThreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewOfferStepThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
