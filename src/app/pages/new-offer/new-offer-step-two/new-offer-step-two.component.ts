import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Offer, OfferTypesEnum } from 'src/app/model/offer.interface';
import { NewOfferService } from 'src/app/services/new-offer.service';
import { OffersService } from '../../services/offers.service';

@Component({
  selector: 'app-new-offer-step-two',
  templateUrl: './new-offer-step-two.component.html',
  styleUrls: ['./new-offer-step-two.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewOfferStepTwoComponent implements OnInit {

  grantForm!: FormGroup;
  buttonDisabled = false;
  action!: string;
  isEdit = false;
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
          requirements: [null],
        });
        this.isLoading = false;
        this.cd.detectChanges();
      }
    });
  }

  private setFormOnEdit(offer: Offer): void {
    this.offer = offer;
    this.grantForm = this.fb.group({
      requirements: [this.offer.requirements?.join('\n')],
    });
    this.isLoading = false;
    this.cd.detectChanges();
  }

  onClick(): void {
    if (this.grantForm.valid) {
      const requirements = this.grantForm.controls.requirements?.value?.split('\n');
      this.newOfferService.setRequirements(requirements);
      if (this.isEdit) {
        const extras: NavigationExtras = {
          queryParams: {
            offerId: this.offer.id,
            action: this.action,
            offerType: this.offer.type
          }
        };
        this.router.navigate(['new-offer/step-three'], extras);
      } else {
        this.router.navigateByUrl('new-offer/step-three');
      }
    } else {
      this.grantForm.markAllAsTouched();
    }
  }

}
