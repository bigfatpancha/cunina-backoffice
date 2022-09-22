import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NewOfferService } from 'src/app/services/new-offer.service';

@Component({
  selector: 'app-new-offer-step-two',
  templateUrl: './new-offer-step-two.component.html',
  styleUrls: ['./new-offer-step-two.component.scss']
})
export class NewOfferStepTwoComponent implements OnInit {

  grantForm!: FormGroup;
  buttonDisabled = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private newOfferService: NewOfferService
  ) {}

  ngOnInit(): void {
    this.grantForm = this.fb.group({
      requirements: [null],
    });
  }

  onClick(): void {
    if (this.grantForm.valid) {
      const requirements = this.grantForm.controls.requirements?.value?.split('\n');
      this.newOfferService.setRequirements(requirements);
      this.router.navigateByUrl('new-offer/step-three');
    } else {
      this.grantForm.markAllAsTouched();
    }
  }

}
