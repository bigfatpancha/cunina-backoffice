import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, forwardRef, Input, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaComponent implements ControlValueAccessor {

  @ViewChild('input') public inputEl!: ElementRef;
  /**
   * Permite personalizar el label que figura en la parte superior del text-area.
   */
  @Input() label: string = '';
  /**
   * Permite personalizar la sugerencia que se muestra en el campo de entrada del text-area.
   */
  @Input() placeholder: string = '';
  /**
   * Si su valor es true, impide que el usuario pueda interacturar con el componente.
   */
  @Input() disabled = false;
  /**
   * Especifica número máximo de caracteres que el usuario puede ingresar.
   */
  @Input() maxlength!: number;

  @Input() rows: string = '10';

  id!: string;
  value!: string;
  isFocused = false;
  private onTouched = () => {};
  private onChange = (_: any) => {};

  constructor(private changeDetectorRef: ChangeDetectorRef) {
    this.id =
      'text-area_' + new Date().getTime() + Math.floor(Math.random() * 100000);
  }

  setDisabledState?(disabled: boolean): void {
    this.disabled = disabled;
    this.changeDetectorRef.markForCheck();
  }

  setValue(value: any): void {
    this.value = value;
    this.onChange(value);
  }

  focus(): void {
    this.inputEl.nativeElement.focus();
  }

  blur(): void {
    this.inputEl.nativeElement.blur();
  }

  onFocus(): void {
    this.isFocused = true;
  }

  onBlur(): void {
    this.onTouched();
    this.isFocused = false;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(value: any): void {
    this.value = value;
    this.changeDetectorRef.markForCheck();
  }

}
