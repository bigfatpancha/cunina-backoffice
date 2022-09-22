import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { NewOfferService } from 'src/app/services/new-offer.service';

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

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private newOfferService: NewOfferService
  ) {}

  ngOnInit(): void {
    this.newOfferService.clearAll();
    this.grantForm = this.fb.group({
      title: [null, [Validators.required]],
      name: [null, [Validators.required]],
      link: [null],
      description: [null, [Validators.required]],
      offerType: [null, [Validators.required]]
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
  }

  onClick(): void {
    if (this.grantForm.valid) {
      this.newOfferService.setTitle(this.grantForm.controls.title.value);
      this.newOfferService.setOrganization(this.grantForm.controls.name.value, this.grantForm.controls.link?.value);
      const description = this.grantForm.controls.description?.value?.split('\n');
      this.newOfferService.setDescription(description);
      this.newOfferService.setType(this.grantForm.controls.offerType.value);
      this.router.navigateByUrl('new-offer/step-two');
    } else {
      this.grantForm.markAllAsTouched();
    }
  }

}
