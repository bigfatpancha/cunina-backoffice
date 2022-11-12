import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface ModalData {
  offerTitle: string
}

@Component({
  selector: 'app-remove-offer-modal',
  templateUrl: './remove-offer-modal.component.html',
  styleUrls: ['./remove-offer-modal.component.scss']
})
export class RemoveOfferModalComponent {

  constructor(
    public dialogRef: MatDialogRef<RemoveOfferModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalData
  ) {}

  onClick(action: string): void {
    this.dialogRef.close(action);
  }

}
