import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Offer, OfferTypesEnum } from 'src/app/model/offer.interface';
import { NewOfferService } from 'src/app/services/new-offer.service';
import { OffersService } from '../../services/offers.service';

@Component({
  selector: 'app-new-offer-step-three',
  templateUrl: './new-offer-step-three.component.html',
  styleUrls: ['./new-offer-step-three.component.scss']
})
export class NewOfferStepThreeComponent implements OnInit {
  grantForm!: FormGroup;
  action!: string;
  isEdit!: boolean;
  offer!: Offer;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private newOfferService: NewOfferService,
    private offersService: OffersService
  ) {}

  ngOnInit(): void {
    this.route.queryParams
    .subscribe(params => {
      this.action = params.action;
      this.isEdit = this.action === 'edit';
      console.log(params)
      if (this.isEdit) {
        if (params.offerType === OfferTypesEnum.workshop) {
          this.offer = this.offersService.getWorkshopById(params.offerId);
        } else {
          this.offer = this.offersService.getScholarshipById(params.offerId);
        }
      }
      this.grantForm = this.fb.group({
        when: [this.isEdit ? this.offer.when?.join('\n') : null],
        where: [this.isEdit ? this.offer.where : null],
        sector: [this.isEdit ? this.offer.sector : null]
      });
    });

  }

  onClick(): void {
    if (this.grantForm.valid) {
      const when = this.grantForm.controls.when?.value?.split('\n');
      this.newOfferService.setWhen(when);
      this.newOfferService.setWhere(this.grantForm.controls.where.value);
      this.newOfferService.setSector(this.grantForm.controls.sector.value);
      if (this.isEdit) {
        const extras: NavigationExtras = {
          queryParams: {
            offerId: this.offer.id,
            action: this.action,
            offerType: this.offer.type
          }
        };
        this.router.navigate(['new-offer/step-four'], extras);
      } else {
        this.router.navigateByUrl('new-offer/step-four');
      }
    } else {
      this.grantForm.markAllAsTouched();
    }
  }
}
