import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

const sizes = {
  small: ['button--small'],
  base: ['']
};

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
  @Input() disabled = false;
  @Input() set size(value: keyof typeof sizes) {
    this._size = (sizes[value] || []).join('');
  }
  _size = '';
}
