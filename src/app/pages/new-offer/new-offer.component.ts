import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderService } from 'src/app/components/services/header.service';
import { NavigationService } from '../services/navigation.service';

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.component.html',
  styleUrls: ['./new-offer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewOfferComponent {

  constructor(private headerService: HeaderService, private navigationService: NavigationService) {
    this.headerService.setTitle('Nueva oferta');
    this.navigationService.showBack$.next(true);
  }
}
