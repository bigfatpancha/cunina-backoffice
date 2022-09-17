import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'cunina-backoffice';
  url = environment.back_url;
  grantForm!: FormGroup;
  organizationForm!: FormGroup;
  descriptionForm!: FormGroup;
  requirementForm!: FormGroup;
  signupForm!: FormGroup;
  signupTypeForm!: FormGroup;
  signupIndex = 0;
  signupListIndex = [0];
  infoForm!: FormGroup;
  requirementIndex = 0;
  requirementArray = ['requirement0'];

  constructor(private angularFirestor: AngularFirestore, private httpClient: HttpClient, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.grantForm = this.fb.group({
      name: [null, [Validators.required]]
    });

    this.organizationForm = this.fb.group({
      name: [null, Validators.required],
      link: [null]
    });
    this.descriptionForm = this.fb.group({
      description: [null, [Validators.required]],
    });
    this.requirementForm = this.fb.group({
      requirement0: [null, [Validators.required]],
    });
    this.signupTypeForm = this.fb.group({
      signupStepType0: [null, [Validators.required]],
    })
    this.signupForm = this.fb.group({});
    this.infoForm = this.fb.group({
      signupDate: [null],
      link: [null, [Validators.required]],
      expirationDate: [null, [Validators.required]],
    });
    this.signupTypeForm.get('signupStepType0')?.valueChanges.subscribe((type: string) => this.generateFormListOrParagraph(type));
  }

  addRequirement(): void {
    this.requirementIndex++;
    const formid = `requirement${this.requirementIndex}`;
    this.requirementForm.addControl(`requirement${this.requirementIndex}`, new FormControl());
    this.requirementArray.push(formid);
  }

  addSignupStep(): void {
    this.signupIndex++;
    this.signupListIndex.push(0);
    const formTypeId = `signupStepType${this.signupIndex}`;
    Object.keys(this.signupTypeForm.controls).forEach((key: string) => {
      this.signupTypeForm.get(key)?.disable();
    })
    this.signupTypeForm.addControl(formTypeId, new FormControl());
    this.signupTypeForm.get(formTypeId)?.valueChanges.subscribe((type: string) => this.generateFormListOrParagraph(type))
  }

  submit(): void {
    const requirements: string[] = [];
    Object.keys(this.requirementForm.controls).forEach(key => {
      requirements.push(this.requirementForm.get(key)?.value);
    });
    const form = {
      name: this.grantForm.get('name')?.value,
      organization: {
        name: this.organizationForm.get('name')?.value,
        link: this.organizationForm.get('link')?.value
      },
      description: this.descriptionForm.get('description')?.value,
      requirements: requirements,
      // signupSteps: this.signupForm.get('signupSteps')?.value,
      signupDate: this.infoForm.get('signupDate')?.value,
      link: this.infoForm.get('link')?.value,
      expirationDate: this.infoForm.get('expirationDate')?.value
    };
    // this.httpClient.post(this.url + '/grants.json', this.grantForm.value).subscribe(response => console.log(response))
  }

  private generateFormListOrParagraph(type: string): void {
    const items = Object.keys(this.signupForm.controls).length - 1;
    const formId = `signupStep${this.signupIndex}`;
    if (items >= this.signupIndex) {
      this.signupForm.removeControl(formId);
    }
    if (type === 'list') {
      this.addNewList(formId);
    } else if (type === 'paragraph') {
      this.signupForm.addControl(formId, new FormControl());
    }
  }

  private addNewList(formId: string): void {
    const controlId = `${formId}number${this.signupListIndex[this.signupIndex]}`;
    const group = new FormGroup({
      [controlId]: new FormControl()
    });
    this.signupForm.addControl(formId, group);
  }

  addListItem(index: number): void {
    const formId = `signupStep${index}`;
    this.signupListIndex[this.signupIndex]++;
    const controlId = `${formId}number${this.signupListIndex[this.signupIndex]}`;
    (this.signupForm.get(formId) as FormGroup).addControl(controlId, new FormControl());
  }

  isList(index: number): boolean {
    const formTypeId = `signupStepType${index}`;
    return this.signupTypeForm.get(formTypeId)?.value === 'list';
  }

  isParagraph(index: number): boolean {
    const formTypeId = `signupStepType${index}`;
    return this.signupTypeForm.get(formTypeId)?.value === 'paragraph';
  }

  getFormGroup(index: number): FormGroup {
    const formId = `signupStep${index}`;
    return this.signupForm.get(formId) as FormGroup;
  }

  getKeys(controls: any): string[] {
    return Object.keys(controls);
  }

  getKeysSpecial(formGroup: string): string[] {
    const controls = (this.signupForm.get(formGroup) as FormGroup).controls
    return this.getKeys(controls);
  }
}
