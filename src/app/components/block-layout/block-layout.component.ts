import { Component, Input, ViewEncapsulation } from '@angular/core';

const gutterOptions: { [key: string]: string[] } = {
  none: ['block-layout--gutter-none'],
  xxsmall: ['block-layout--gutter-xxsmall'],
  xsmall: ['block-layout--gutter-xsmall'],
  small: ['block-layout--gutter-small'],
  base: ['block-layout--gutter-medium'],
  large: ['block-layout--gutter-large'],
  xlarge: ['block-layout--gutter-xlarge'],
  xxlarge: ['block-layout--gutter-xxlarge'],
};

@Component({
  selector: 'app-block-layout',
  templateUrl: './block-layout.component.html',
  styleUrls: ['./block-layout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BlockLayoutComponent {
  /**
   * none
   * xxsmall 4px
   * xsmall 8px
   * small 16px
   * base 24px
   * large 32px
   * xlarge 40px
   * xxlarge 48px
   * xxxlarge 64px
   */
  @Input() set gutter(value: keyof typeof gutterOptions) {
    this._gutter = (gutterOptions[value] || []).join(' ');
  }
  _gutter = 'block-layout--gutter-medium';

  @Input() set top(value: boolean | '') {
    this._top = value !== false ? 'block-layout--margin-top' : '';
  }
  _top!: string;

  @Input() set bottom(value: boolean | '') {
    this._bottom = value !== false ? 'block-layout--margin-bottom' : '';
  }
  _bottom!: string;

}
