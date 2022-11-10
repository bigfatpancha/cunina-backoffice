import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Offer, OfferTypesEnum } from 'src/app/model/offer.interface';
import { NewOfferService } from 'src/app/services/new-offer.service';
import { OffersService } from '../../services/offers.service';

@Component({
  selector: 'app-new-offer-step-three',
  templateUrl: './new-offer-step-three.component.html',
  styleUrls: ['./new-offer-step-three.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewOfferStepThreeComponent implements OnInit {
  grantForm!: FormGroup;
  action!: string;
  isEdit!: boolean;
  offer!: Offer;
  isLoading = true;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private newOfferService: NewOfferService,
    private offersService: OffersService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.queryParams
    .subscribe(params => {
      this.action = params.action;
      this.isEdit = this.action === 'edit';
      if (this.isEdit) {
        if (params.offerType === OfferTypesEnum.workshop) {
          this.offersService.getWorkshopById(params.offerId).subscribe((offer: Offer) => {
            this.setFormOnEdit(offer);
          });
        } else {
          this.offersService.getScholarshipById(params.offerId).subscribe((offer: Offer) => {
            this.setFormOnEdit(offer);
          });
        }
      } else {
        this.grantForm = this.fb.group({
          when: [this.isEdit ? this.offer.when?.join('\n') : null],
          where: [this.isEdit ? this.offer.where : null],
          sector: [this.isEdit ? this.offer.sector : null]
        });
        this.isLoading = false;
        this.cd.detectChanges();
      }
    });

  }

  private setFormOnEdit(offer: Offer): void {
    this.offer = offer;
    this.grantForm = this.fb.group({
      when: [this.offer.when?.join('\n')],
      where: [this.offer.where],
      sector: [this.offer.sector]
    });
    this.isLoading = false;
    this.cd.detectChanges();
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
