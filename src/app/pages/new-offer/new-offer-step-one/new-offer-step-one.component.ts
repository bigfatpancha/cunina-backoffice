import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { HeaderService } from 'src/app/components/services/header.service';
import { Offer, OfferTypesEnum } from 'src/app/model/offer.interface';
import { NewOfferService } from 'src/app/services/new-offer.service';
import { NavigationService } from '../../services/navigation.service';
import { OffersService } from '../../services/offers.service';

@Component({
  selector: 'app-new-offer-step-one',
  templateUrl: './new-offer-step-one.component.html',
  styleUrls: ['./new-offer-step-one.component.scss']
})
export class NewOfferStepOneComponent implements OnInit {

  grantForm!: FormGroup;
  showTitleError = false;
  showDescriptionError = false;
  showNameError = false;
  showTypeError = false;
  buttonDisabled = true;
  title = 'Nueva Beca / Taller';
  action: 'edit' | 'new' = 'new';
  // offerId!: string;
  offer!: Offer;
  private isEdit = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private newOfferService: NewOfferService,
    private offersService: OffersService,
    private headerService: HeaderService
  ) {}

  ngOnInit(): void {
    this.route.queryParams
    .subscribe(params => {
      this.action = params.action;
      this.isEdit = this.action === 'edit';
      this.newOfferService.clearAll();
      if (this.isEdit) {
        this.title = 'Edición de beca / taller';
        if (params.offerType === OfferTypesEnum.workshop) {
          this.offersService.getWorkshopById(params.offerId).subscribe((offer: Offer) => {
            this.offer = offer;
          });
        } else {
          this.offersService.getScholarshipById(params.offerId).subscribe((offer: Offer) => {
            this.offer = offer;
          });
        }
      }
      this.headerService.setTitle(this.title);
      this.setForm();
    })
  }

  private setForm(): void {
    this.grantForm = this.fb.group({
      title: [this.isEdit ? this.offer.title : null, [Validators.required]],
      name: [this.isEdit ? this.offer.organization : null, [Validators.required]],
      link: [this.isEdit ? this.offer.link : null],
      description: [this.isEdit ? this.offer.description.join('\n') : null, [Validators.required]],
      offerType: [this.isEdit ? this.offer.type : null, [Validators.required]]
    });

    this.grantForm.statusChanges.pipe(
      distinctUntilChanged(),
      map((status: string) => status !== 'VALID')
    ).subscribe((isDisabled) => this.buttonDisabled = isDisabled)

    this.grantForm.controls.title.statusChanges.pipe(
      distinctUntilChanged(),
      map((status: string) => status !== 'VALID')
    ).subscribe((showError) => {
      this.showTitleError = showError;
      if (this.grantForm.controls.title.untouched) {
        this.grantForm.controls.title.markAsTouched();
      }
    });

    this.grantForm.controls.name.statusChanges.pipe(
      distinctUntilChanged(),
      map((status: string) => status !== 'VALID')
    ).subscribe((showError) => {
      this.showNameError = showError;
      if (this.grantForm.controls.name.untouched) {
        this.grantForm.controls.name.markAsTouched();
      }
    });

    this.grantForm.controls.description.statusChanges.pipe(
      distinctUntilChanged(),
      map((status: string) => status !== 'VALID')
    ).subscribe((showError) => {
      this.showDescriptionError = showError;
      if (this.grantForm.controls.description.untouched) {
        this.grantForm.controls.description.markAsTouched();
      }
    });
    this.grantForm.controls.offerType.statusChanges.pipe(
      distinctUntilChanged(),
      map((status: string) => status !== 'VALID')
    ).subscribe((showError) => {
      this.showTypeError = showError;
      if (this.grantForm.controls.offerType.untouched) {
        this.grantForm.controls.offerType.markAsTouched();
      }
    });
    this.buttonDisabled = this.grantForm.status !== 'VALID';
  }

  onClick(): void {
    if (this.grantForm.valid) {
      this.newOfferService.setTitle(this.grantForm.controls.title.value);
      this.newOfferService.setOrganization(this.grantForm.controls.name.value, this.grantForm.controls.link?.value);
      const description = this.grantForm.controls.description?.value?.split('\n');
      this.newOfferService.setDescription(description);
      this.newOfferService.setType(this.grantForm.controls.offerType.value);
      if (this.isEdit) {
        const extras: NavigationExtras = {
          queryParams: {
            offerId: this.offer.id,
            action: this.action,
            offerType: this.offer.type
          }
        };
        this.router.navigate(['new-offer/step-two'], extras);
      } else {
        this.router.navigateByUrl('new-offer/step-two');
      }
    } else {
      this.grantForm.markAllAsTouched();
    }
  }

}
