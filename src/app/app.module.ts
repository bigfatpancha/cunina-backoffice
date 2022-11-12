import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';


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
import { HomeComponent } from './pages/home/home.component';
import { ListComponent } from './pages/list/list.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { DetailComponent } from './pages/detail/detail.component';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire';
import {MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { LoginErrorComponent } from './pages/errors/login-error/login-error.component';

@NgModule({
  declarations: [
    AppComponent,
    NewOfferStepOneComponent,
    NewOfferStepTwoComponent,
    NewOfferStepThreeComponent,
    NewOfferComponent,
    NewOfferStepFourComponent,
    HomeComponent,
    ListComponent,
    DetailComponent,
    LoginErrorComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    ReactiveFormsModule,
    ComponentsModule,
    MatIconModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatGridListModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
