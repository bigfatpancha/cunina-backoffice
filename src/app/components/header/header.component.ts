import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { HeaderService } from '../services/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Input() showBack = false;
  @Output() back: EventEmitter<void> = new EventEmitter();

  title!: string;
  private subscriptions = new Subscription();

  constructor(private service: HeaderService) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.service.title$.subscribe((title: string) => this.title = title)
    );
  }

  onBack(): void {
    this.back.emit();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
