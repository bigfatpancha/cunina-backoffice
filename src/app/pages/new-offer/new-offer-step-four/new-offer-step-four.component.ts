import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { NewOfferService } from 'src/app/services/new-offer.service';
import { environment } from 'src/environments/environment';
import { OffersService } from '../../services/offers.service';
import { Offer, OfferType, OfferTypesEnum } from './../../../model/offer.interface';

@Component({
  selector: 'app-new-offer-step-four',
  templateUrl: './new-offer-step-four.component.html',
  styleUrls: ['./new-offer-step-four.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewOfferStepFourComponent implements OnInit {
  private readonly TOAST_DURATION = 5000;
  grantForm!: FormGroup;
  url = environment.back_url;
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
    private cd: ChangeDetectorRef,
    private _snackBar: MatSnackBar
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
          contactPhone: [this.isEdit ? this.offer.contact?.phones?.join('\n') : null],
          contactInfo: [this.isEdit ? this.offer.contact?.info : null]
        });
        this.isLoading = false;
        this.cd.detectChanges();
      }
    });

  }

  private setFormOnEdit(offer: Offer): void {
    this.offer = offer;
    this.grantForm = this.fb.group({
      contactPhone: [this.offer.contact?.phones?.join('\n')],
      contactInfo: [this.offer.contact?.info]
    });
    this.isLoading = false;
    this.cd.detectChanges();
  }

  onClick(): void {
    if (this.grantForm.valid) {
      const contactPhone = this.grantForm.controls.contactPhone?.value?.split('\n');
      this.newOfferService.setContactInfo(contactPhone, this.grantForm.controls.contactInfo.value);
      const offer = this.newOfferService.getOffer();
      const type = this.newOfferService.getType();
      if (type === OfferTypesEnum.scholarship) {
        if (this.isEdit && this.offer.id) {
          this.offersService.updateScholarship(this.offer.id, offer)
            .then(() => this.thenFunction())
            .catch((error: any) => this.catchFunction(error));
        } else {
          this.offersService.addScholarship(offer);
        }
      } else if (type === OfferTypesEnum.workshop) {
        if (this.isEdit && this.offer.id) {
          this.offersService.updateWorkshop(this.offer.id, offer);
        } else {
          this.offersService.addWorkshop(offer);
        }
      }
      this.router.navigateByUrl('home');
    } else {
      this.grantForm.markAllAsTouched();
    }
  }

  private thenFunction(): void {
    this.router.navigate(['home']);
    this.openSnackBar('La oferta fue actualizada con éxito!')
  }
  private catchFunction(error: any): void {
    this.router.navigate(['home']);
    console.error(error);
    this.openSnackBar('Hubo un error al actualizar la oferta.')
  }

  private openSnackBar(message: string) {
    this._snackBar.open(message, undefined, {
      duration: this.TOAST_DURATION,
    });
  }
}
