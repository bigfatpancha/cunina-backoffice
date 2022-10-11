import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

const types = {
  outline: ['button-icon--outline']
};

@Component({
  selector: 'app-button-icon',
  templateUrl: './button-icon.component.html',
  styleUrls: ['./button-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonIconComponent {
  @Input() icon!: string;
  @Input() set type(value: keyof typeof types) {
    this._type = (types[value] || []).join('');
  }
  _type = '';
}
