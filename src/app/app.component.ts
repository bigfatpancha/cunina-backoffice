import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

export interface Offer {
  title: string;
  organization: Organization;
  description: string[];
  requirements?: string[];
  when?: string[];
  where?: string;
  contact?: Contact;
  sector?: string;
}

export interface Organization {
  name: string;
  link?: string;
}
export interface Contact {
  info?: string;
  phones?: string[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'cunina-backoffice';
  url = environment.back_url;
  grantForm!: FormGroup;
  organizationForm!: FormGroup;
  descriptionForm!: FormGroup;
  requirementForm!: FormGroup;
  offerTypeForm!: FormGroup;
  infoForm!: FormGroup;

  constructor(private angularFirestor: AngularFirestore, private httpClient: HttpClient, private fb: FormBuilder) {}

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
    this.requirementForm = this.fb.group({
      requirements: [null],
    });
    this.infoForm = this.fb.group({
      when: [null],
      where: [null],
      contactInfo: [null],
      contactPhone: [null],
      sector: [null],
    });
    this.offerTypeForm = this.fb.group({
      offerType: ['scholarship']
    })

  }


  submit(): void {
    const offer: Offer = {
      title: this.grantForm.get('title')?.value,
      organization: {
        name: this.organizationForm.get('name')?.value,
        link: this.organizationForm.get('link')?.value
      },
      description: this.descriptionForm.get('description')?.value?.split('\n'),
      requirements: this.requirementForm.get('requirements')?.value?.split('\n'),
      when: this.infoForm.get('when')?.value?.split('\n'),
      where: this.infoForm.get('where')?.value,
      contact: {
        info: this.infoForm.get('contactInfo')?.value,
        phones: this.infoForm.get('contactPhone')?.value?.split('\n')
      },
      sector: this.infoForm.get('sector')?.value
    };
    console.log('offer', offer)
    // this.httpClient.post(this.url + '/grants.json', this.grantForm.value).subscribe(response => console.log(response))
  }

}
