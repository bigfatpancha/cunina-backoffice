import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeaderService } from 'src/app/components/services/header.service';
import { NavigationService } from '../services/navigation.service';
import { Offer, OffersService } from '../services/offers.service';

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

}
