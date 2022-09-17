import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NewOfferStepOneComponent } from './pages/new-offer/new-offer-step-one/new-offer-step-one.component';
import { NewOfferStepTwoComponent } from './pages/new-offer/new-offer-step-two/new-offer-step-two.component';
import { NewOfferComponent } from './pages/new-offer/new-offer.component';

const routes: Routes = [
  {
    path: 'home',
    component: AppComponent
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
      }
    ]    
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
