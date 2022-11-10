import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavigationService } from './pages/services/navigation.service';
import { OffersService } from './pages/services/offers.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {
  showBack = false;
  title = 'Cunina Manejo de ofertas';
  subscriptions: Subscription = new Subscription();

  constructor(private navigationService: NavigationService, private cd: ChangeDetectorRef, private offersService: OffersService) { }

  ngOnInit(): void {
    this.offersService.initService();
    this.subscriptions.add(
      this.navigationService.showBack$.subscribe(showBack => {
        this.showBack = showBack;
        this.cd.detectChanges();
      })
    );
  }

  onBack(): void {
    this.navigationService.back();
  }


  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}

