import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DetailComponent } from './pages/detail/detail.component';
import { LoginErrorComponent } from './pages/errors/login-error/login-error.component';
import { HomeComponent } from './pages/home/home.component';
import { ListComponent } from './pages/list/list.component';
import { NewOfferStepFourComponent } from './pages/new-offer/new-offer-step-four/new-offer-step-four.component';
import { NewOfferStepOneComponent } from './pages/new-offer/new-offer-step-one/new-offer-step-one.component';
import { NewOfferStepThreeComponent } from './pages/new-offer/new-offer-step-three/new-offer-step-three.component';
import { NewOfferStepTwoComponent } from './pages/new-offer/new-offer-step-two/new-offer-step-two.component';
import { NewOfferComponent } from './pages/new-offer/new-offer.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'new-offer',
    component: NewOfferComponent,
    children: [
      {
        path: 'step-one',
        component: NewOfferStepOneComponent
      },
      {
        path: 'step-two',
        component: NewOfferStepTwoComponent
      },
      {
        path: 'step-three',
        component: NewOfferStepThreeComponent
      },
      {
        path: 'step-four',
        component: NewOfferStepFourComponent
      }
    ]
  },
  {
    path: 'list',
    component: ListComponent
  },
  {
    path: 'offer',
    component: DetailComponent
  },
  {
    path: 'edit',
    component: NewOfferComponent,
    children: [
      {
        path: 'step-one',
        component: NewOfferStepOneComponent
      },
      {
        path: 'step-two',
        component: NewOfferStepTwoComponent
      },
      {
        path: 'step-three',
        component: NewOfferStepThreeComponent
      },
      {
        path: 'step-four',
        component: NewOfferStepFourComponent
      }
    ]
  },
  {
    path: 'login-error',
    component: LoginErrorComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
