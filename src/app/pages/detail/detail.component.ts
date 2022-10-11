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

  offerType!: 'workshops' | 'scholarships';
  title!: string;
  id!: string;
  offer!: Offer;
  isLoading = true;
  showRequirements = false;
  showWhen = false;
  showWhere = false;
  showContactInfo = false;
  showContactPhones = false;
  showSector = false;
  showLink = false;

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
        if (this.offerType === 'workshops') {
          this.title = 'Detalle del taller';
          this.offer = this.offersService.getWorkshopById(this.id);
        } else {
          this.title = 'Detalle de la beca';
          this.offer = this.offersService.getScholarshipById(this.id);
        }
        this.headerService.setTitle(this.title);
        this.showRequirements = this.getShowRequirements();
        this.showWhen = this.getShowWhen();
        this.showWhere = this.getShowWhere();
        this.showContactInfo = this.getShowContactInfo();
        this.showContactPhones = this.getShowContactPhones();
        this.showSector = this.getShowSector();
        this.showLink = this.getShowLink();
        this.isLoading = false;
        this.cd.markForCheck();
      }
    );
  }

  edit(): void {
    this.router.navigate(['edit/step-one']);
  }

  delete(): void {
    console.log('BORRAR')
  }

  private getShowRequirements(): boolean {
    return this.offer.requirements !== undefined && this.offer.requirements.length > 0 && this.offer.requirements[0] !== '';
  }

  private getShowWhen(): boolean {
    return this.offer.when !== undefined && this.offer.when.length > 0 && this.offer.when[0] !== '';
  }

  private getShowWhere(): boolean {
    return this.offer.where !== undefined && this.offer.where !== '';
  }

  private getShowContactInfo(): boolean {
    return this.offer.contact !== undefined && this.offer.contact.info !== undefined && this.offer.contact.info !== '';
  }

  private getShowContactPhones(): boolean {
    return this.offer.contact !== undefined &&
      this.offer.contact.phones !== undefined &&
      this.offer.contact.phones.length > 0 &&
      this.offer.contact.phones[0] !== '';
  }

  private getShowSector(): boolean {
    return this.offer.sector !== undefined && this.offer.sector !== '';
  }

  private getShowLink(): boolean {
    return this.offer.link !== undefined && this.offer.link !== '';
  }

}
