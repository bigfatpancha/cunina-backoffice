import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { HeaderService } from '../../components/services/header.service';
import { Offer } from '../../model/offer.interface';
import { NavigationService } from '../services/navigation.service';
import { OffersService } from '../services/offers.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit {
  offerType!: string;
  title!: string;
  offers!: Offer[];

  constructor(
    private route: ActivatedRoute,
    private offersService: OffersService,
    private navigationService: NavigationService,
    private headerService: HeaderService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.navigationService.showBack$.next(true);
    this.route.queryParams
      .subscribe(params => {
        this.offerType = params.offerType;
        if (this.offerType === 'workshops') {
          this.title = 'Talleres';
          this.offers = this.offersService.getWorkshops();
        } else {
          this.title = 'Becas';
          this.offers = this.offersService.getScholarships();
        }
        this.headerService.setTitle(this.title);
        this.cd.markForCheck();
      }
    );
  }

  goToDetail(_id: string | undefined): void {
    const extras: NavigationExtras = {
      queryParams: {
        offerType: this.offerType,
        id: _id
      }
    }
    this.router.navigate(['offer'], extras);
  }

}
