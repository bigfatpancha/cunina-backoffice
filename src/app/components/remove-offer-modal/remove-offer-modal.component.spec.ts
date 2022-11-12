import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveOfferModalComponent } from './remove-offer-modal.component';

describe('RemoveOfferModalComponent', () => {
  let component: RemoveOfferModalComponent;
  let fixture: ComponentFixture<RemoveOfferModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveOfferModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveOfferModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
