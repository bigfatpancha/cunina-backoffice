import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { HeaderService } from 'src/app/components/services/header.service';
import { Offer, OfferType } from '../../model/offer.interface';
import { NavigationService } from '../services/navigation.service';
import { OffersService } from '../services/offers.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  workshops!: Offer[];
  scholarships!: Offer[];

  constructor(
    private router: Router,
    private offersService: OffersService,
    private headerService: HeaderService,
    private navigationService: NavigationService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.navigationService.showBack$.next(false);
    this.headerService.setTitle('Cunina Manejo de Ofertas')
    this.offersService.workshops$.subscribe((offers: Offer[]) => {
      this.workshops = offers;
      if (this.workshops.length > 5) {
        this.workshops = this.workshops.slice(0, 5);
      }
      this.cd.detectChanges();
    });
    this.offersService.scholarships$.subscribe((offers: Offer[]) => {
      this.scholarships = offers;
      if (this.scholarships.length > 5) {
        this.scholarships = this.scholarships.slice(0, 5);
      }
      this.cd.detectChanges();
    })
  }

  goToNewOffer(): void {
    this.router.navigateByUrl('new-offer/step-one');
  }

  seeMore(_offerType: OfferType): void {
    const extras: NavigationExtras = {
      queryParams: {
        offerType: _offerType
      }
    }
    this.router.navigate(['list'], extras);
  }

  goToDetail(_offerType: OfferType, _id: string | undefined): void {
    const extras: NavigationExtras = {
      queryParams: {
        offerType: _offerType,
        id: _id
      }
    }
    this.router.navigate(['offer'], extras);
  }

}
