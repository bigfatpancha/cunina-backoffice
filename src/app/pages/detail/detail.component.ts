import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { RemoveOfferModalComponent } from 'src/app/components/remove-offer-modal/remove-offer-modal.component';
import { HeaderService } from '../../components/services/header.service';
import { Offer, OfferType, OfferTypesEnum } from '../../model/offer.interface';
import { NavigationService } from '../services/navigation.service';
import { OffersService } from '../services/offers.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailComponent implements OnInit {
  private readonly TOAST_DURATION = 5000;

  offerType!: OfferType;
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
  showFilters = false;

  constructor(
    private route: ActivatedRoute,
    private offersService: OffersService,
    private navigationService: NavigationService,
    private headerService: HeaderService,
    private router: Router,
    private cd: ChangeDetectorRef,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.navigationService.showBack$.next(true);
    this.route.queryParams
      .subscribe(params => {
        this.offerType = params.offerType;
        this.id = params.id;
        if (this.offerType === OfferTypesEnum.workshop) {
          this.title = 'Detalle del taller';
          this.offersService.getWorkshopById(this.id).subscribe((offer: Offer) => {
            this.offer = offer;
            this.initialiceDetail();
            this.cd.detectChanges();
          });
        } else {
          this.title = 'Detalle de la beca';
          this.offersService.getScholarshipById(this.id).subscribe((offer: Offer) => {
            this.offer = offer;
            this.initialiceDetail();
            this.cd.detectChanges();
          });
        }
        this.headerService.setTitle(this.title);
      }
    );
  }

  private initialiceDetail(): void {
    this.showRequirements = this.getShowRequirements();
    this.showWhen = this.getShowWhen();
    this.showWhere = this.getShowWhere();
    this.showContactInfo = this.getShowContactInfo();
    this.showContactPhones = this.getShowContactPhones();
    this.showSector = this.getShowSector();
    this.showLink = this.getShowLink();
    this.showFilters = this.getShowFilters();
    this.isLoading = false;
    this.cd.markForCheck();
  }

  edit(): void {
    const extras: NavigationExtras = {
      queryParams: {
        action: 'edit',
        offerId: this.id,
        offerType: this.offerType
      }
    }
    this.router.navigate(['edit/step-one'], extras);
  }

  openDialog(): void {
    const modalRef = this.dialog.open(RemoveOfferModalComponent, {width: '250px'});
    modalRef.afterClosed().subscribe((action: string) => {
      if (action === 'delete') {
        this.delete();
      }
    })
  }

  delete(): void {
    if (this.offerType === OfferTypesEnum.workshop) {
      this.offersService.removeWorkshop(this.id)
        .then(() => this.thenFunction())
        .catch((error) => this.catchFunction(error));
    } else {
      this.offersService.removeScholarship(this.id)
        .then(() => this.thenFunction())
        .catch((error) => this.catchFunction(error));
    }
  }

  private thenFunction(): void {
    this.router.navigate(['home']);
    this.openSnackBar('La oferta fue borrada con éxito!')
  }
  private catchFunction(error: any): void {
    this.router.navigate(['home']);
    console.error(error);
    this.openSnackBar('Hubo un error al borrar la oferta.')
  }

  private openSnackBar(message: string) {
    this._snackBar.open(message, undefined, {
      duration: this.TOAST_DURATION,
    });
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

  private getShowFilters(): boolean {
    return this.offer.filters !== undefined && this.offer.filters.length > 0 && this.offer.filters[0] !== '';

  }

}
