import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-offers-card',
  templateUrl: './offers-card.component.html',
  styleUrls: ['./offers-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OffersCardComponent {

  @Input() title!: string;
  @Input() description!: string;
  @Input() seeMore = false;

}
