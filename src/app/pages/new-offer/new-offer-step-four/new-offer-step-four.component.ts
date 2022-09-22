import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NewOfferService } from 'src/app/services/new-offer.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-new-offer-step-four',
  templateUrl: './new-offer-step-four.component.html',
  styleUrls: ['./new-offer-step-four.component.scss']
})
export class NewOfferStepFourComponent implements OnInit {
  grantForm!: FormGroup;
  url = environment.back_url;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private newOfferService: NewOfferService,
    private httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    this.grantForm = this.fb.group({
      contactPhone: [null],
      contactInfo: [null]
    });

  }

  onClick(): void {
    if (this.grantForm.valid) {
      const contactPhone = this.grantForm.controls.contactPhone?.value?.split('\n');
      this.newOfferService.setContactInfo(contactPhone, this.grantForm.controls.contactInfo.value);
      const offer = this.newOfferService.getOffer();
      const offerType = this.newOfferService.getType();
      if (offerType === 'scholarship') {
        // TODO nueva beca
        // this.httpClient.post(this.url + '/grants.json', this.grantForm.value).subscribe(response => console.log(response))

      } else if (offerType === 'workshop') {
        // TODO nuevo taller
      }
      // this.router.navigateByUrl('new-offer/step-two');
    } else {
      this.grantForm.markAllAsTouched();
    }
  }
}
