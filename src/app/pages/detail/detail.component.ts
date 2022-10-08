import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderService } from '../../components/services/header.service';
import { Offer } from '../../model/offer.interface';
import { NavigationService } from '../services/navigation.service';
import { OffersService } from '../services/offers.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailComponent implements OnInit {

  offerType!: 'workshop' | 'scholarship';
  title!: string;
  id!: string;
  offer!: Offer;

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
        this.id = params.id;
        if (this.offerType === 'workshop') {
          this.title = 'Detalle del taller';
          this.offer = this.offersService.getWorkshopById(this.id);
        } else {
          this.title = 'Detalle de la beca';
          this.offer = this.offersService.getScholarshipById(this.id);
        }
        this.headerService.setTitle(this.title);
        this.cd.markForCheck();
      }
    );
  }

}
