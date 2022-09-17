import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

const gutterOptions = {
  none: ['layout-container--gutter-none'],
  small: ['layout-container--gutter-small'],
  medium: ['layout-container--gutter-medium'],
  large: ['layout-container--gutter-large'],
  xlarge: ['layout-container--gutter-xlarge']
};

@Component({
  selector: 'app-layout-container',
  templateUrl: './layout-container.component.html',
  styleUrls: ['./layout-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutContainerComponent {
/**
   * none
   * small 8px
   * medium 16px
   * large 24px
   * xlarge 32px
   */
 @Input() set gutter(value: keyof typeof gutterOptions) {
  this._gutter = (gutterOptions[value] || []).join(' ');
}
_gutter = 'layout-container--gutter-large';
}
