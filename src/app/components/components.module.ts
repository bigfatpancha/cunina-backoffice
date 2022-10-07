import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { HeaderComponent } from './header/header.component';
import { TextFieldComponent } from './text-field/text-field.component';
import { TextareaComponent } from './textarea/textarea.component';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { LayoutContainerComponent } from './layout-container/layout-container.component';
import { BlockLayoutComponent } from './block-layout/block-layout.component';
import { FieldErrorComponent } from './field-error/field-error.component';
import { OffersCardComponent } from './offers-card/offers-card.component';
import { ButtonIconComponent } from './button-icon/button-icon.component';



@NgModule({
  declarations: [
    ButtonComponent,
    HeaderComponent,
    TextFieldComponent,
    TextareaComponent,
    LayoutContainerComponent,
    BlockLayoutComponent,
    FieldErrorComponent,
    OffersCardComponent,
    ButtonIconComponent
  ],
  exports: [
    ButtonComponent,
    HeaderComponent,
    TextFieldComponent,
    TextareaComponent,
    LayoutContainerComponent,
    BlockLayoutComponent,
    FieldErrorComponent,
    OffersCardComponent,
    ButtonIconComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    FormsModule
  ]
})
export class ComponentsModule { }
