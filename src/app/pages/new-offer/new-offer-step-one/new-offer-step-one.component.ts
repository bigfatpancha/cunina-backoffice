import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-offer-step-one',
  templateUrl: './new-offer-step-one.component.html',
  styleUrls: ['./new-offer-step-one.component.scss']
})
export class NewOfferStepOneComponent implements OnInit {

  grantForm!: FormGroup;
  organizationForm!: FormGroup;
  descriptionForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.grantForm = this.fb.group({
      title: [null, [Validators.required]]
    });

    this.organizationForm = this.fb.group({
      name: [null, Validators.required],
      link: [null]
    });
    this.descriptionForm = this.fb.group({
      description: [null, [Validators.required]],
    });
    

  }

  onClick(): void {
    // TODO guardar datos en servicio
    this.router.navigateByUrl('new-offer/step-two');
  }

}
