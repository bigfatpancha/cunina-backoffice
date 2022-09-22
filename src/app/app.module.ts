import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from './components/components.module';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NewOfferStepTwoComponent } from './pages/new-offer/new-offer-step-two/new-offer-step-two.component';
import { NewOfferStepThreeComponent } from './pages/new-offer/new-offer-step-three/new-offer-step-three.component';
import { AppRoutingModule } from './app-routing.module';
import { NewOfferComponent } from './pages/new-offer/new-offer.component';
import { NewOfferStepOneComponent } from './pages/new-offer/new-offer-step-one/new-offer-step-one.component';
import { NewOfferStepFourComponent } from './pages/new-offer/new-offer-step-four/new-offer-step-four.component';

@NgModule({
  declarations: [
    AppComponent,
    NewOfferStepOneComponent,
    NewOfferStepTwoComponent,
    NewOfferStepThreeComponent,
    NewOfferComponent,
    NewOfferStepFourComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    ReactiveFormsModule,
    ComponentsModule,
    MatIconModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
