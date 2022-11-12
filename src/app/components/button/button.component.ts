import { ChangeDetectionStrategy, Component, Input, Type } from '@angular/core';

const sizes = {
  small: ['button--small'],
  base: ['']
};

const types = {
  primary: [''],
  secondary: ['button--secondary']
}

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
  @Input() disabled = false;
  @Input() set size(value: keyof typeof sizes) {
    this._size = (sizes[value] || []).join(' ');
  }
  _size = '';
  @Input() set type(value: keyof typeof types) {
    this._type = (types[value] || []).join(' ');
  }
  _type = '';
}
