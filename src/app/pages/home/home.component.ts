import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/components/services/header.service';
import { NavigationService } from '../services/navigation.service';
import { Offer, OffersService } from '../services/offers.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  workshops!: Offer[];
  scholarships!: Offer[];

  constructor(
    private router: Router,
    private offersService: OffersService,
    private headerService: HeaderService,
    private navigationService: NavigationService
  ) { }

  ngOnInit(): void {
    this.navigationService.showBack$.next(false);
    this.headerService.setTitle('Cunina Manejo de Ofertas')
    this.workshops = this.offersService.getWorkshops();
    this.scholarships = this.offersService.getScholarships();
    if (this.workshops.length > 5) {
      this.workshops = this.workshops.slice(0, 5);
    }
    if (this.scholarships.length > 5) {
      this.scholarships = this.scholarships.slice(0, 5);
    }
  }

  goToNewOffer(): void {
    this.router.navigateByUrl('new-offer/step-one');
  }

}
