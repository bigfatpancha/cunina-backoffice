import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, forwardRef, Input, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const typesOfInputs = {
  default: ['text-field__container'],
  trasnparent: ['text-field__container--line'],
};

@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextFieldComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextFieldComponent implements ControlValueAccessor {
  @ViewChild('input') public inputEl!: ElementRef;
  /**
   * Permite personalizar el label que figura en la parte superior del text-field.
   */
  @Input() label: string = '';
  /**
   * Determina el tipo del text field,
   * si se desea un campo de texto normal enviar type="text"
   * si se desea un campo contraseña enviar type="password",
   * si se desea un date-picker enviar type="date"
   */
  @Input() type = 'text';
  /**
   * Permite personalizar la sugerencia que se muestra en el campo de entrada del text-field.
   */
  @Input() placeholder: string = '';
  /**
   * Especifica una expresión regular con la que debe coincidir el valor del control de formulario.
   */
  @Input() pattern: string = '';
  /**
   * Especifica número máximo de caracteres que el usuario puede ingresar.
   */
  @Input() maxlength!: number;
  /**
   * Si su valor es true, impide que el usuario pueda interacturar con el componente.
   */
  @Input() disabled = false;

  /**
   *  convierte al text-field en un text-field para contraseñas.
   */
  @Input('password')
  set password(value: boolean) {
    this._password = value;
    if (this._password) {
      this.type = 'password';
    }
  }
  /**
   *  me permite elegir el tipo de teclado que levanta el text field
   */
  @Input() inputmode:
    | 'decimal'
    | 'text'
    | 'none'
    | 'numeric'
    | 'search'
    | 'tel'
    | 'url'
    | 'email' = 'text';

  _typeOfInput = 'text-field__container';
  @Input() set transparent(trasnparent: boolean) {
    this._typeOfInput = trasnparent
      ? typesOfInputs.trasnparent.join(' ')
      : typesOfInputs.default.join(' ');
  }

  _password!: boolean;
  id!: string;
  _readonly = false;
  value!: string;
  isFocused = false;
  private onTouched = () => {};
  private onChange = (_: any) => {};

  constructor(
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.id =
      'text-field_' + new Date().getTime() + Math.floor(Math.random() * 100000);
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
    if (!this._readonly) {
      this.isFocused = true;
    }
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
