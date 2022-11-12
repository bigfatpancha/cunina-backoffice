import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavigationService } from './pages/services/navigation.service';
import { OffersService } from './pages/services/offers.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { NavigationExtras, Router } from '@angular/router';

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

  constructor(
    private navigationService: NavigationService,
    private cd: ChangeDetectorRef,
    private offersService: OffersService,
    private fireauth: AngularFireAuth,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.signInAnonymously().then(() => {
      this.offersService.initService();
      this.subscriptions.add(
        this.navigationService.showBack$.subscribe(showBack => {
          this.showBack = showBack;
          this.cd.detectChanges();
        })
      );
    }).catch((_error) => {
      const extras: NavigationExtras = {
        queryParams: {
          error: _error
        }
      }
      this.router.navigate(['login-error'], extras);
    });
  }

  private signInAnonymously(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.fireauth.signInAnonymously().then((data) => {
        resolve(data);
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        reject(`login failed ${error.message}`);
        // ...
      });
    });
  }

  onBack(): void {
    this.navigationService.back();
  }


  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}

