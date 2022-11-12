import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-remove-offer-modal',
  templateUrl: './remove-offer-modal.component.html',
  styleUrls: ['./remove-offer-modal.component.scss']
})
export class RemoveOfferModalComponent {

  constructor(public dialogRef: MatDialogRef<RemoveOfferModalComponent>) {}

  onClick(action: string): void {
    this.dialogRef.close(action);
  }

}
