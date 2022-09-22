import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NewOfferService } from 'src/app/services/new-offer.service';

@Component({
  selector: 'app-new-offer-step-three',
  templateUrl: './new-offer-step-three.component.html',
  styleUrls: ['./new-offer-step-three.component.scss']
})
export class NewOfferStepThreeComponent implements OnInit {
  grantForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private newOfferService: NewOfferService
  ) {}

  ngOnInit(): void {
    this.grantForm = this.fb.group({
      when: [null],
      where: [null],
      sector: [null]
    });

  }

  onClick(): void {
    if (this.grantForm.valid) {
      const when = this.grantForm.controls.when?.value?.split('\n');
      this.newOfferService.setWhen(when);
      this.newOfferService.setWhere(this.grantForm.controls.where.value);
      this.newOfferService.setSector(this.grantForm.controls.sector.value);
      this.router.navigateByUrl('new-offer/step-four');
    } else {
      this.grantForm.markAllAsTouched();
    }
  }
}
