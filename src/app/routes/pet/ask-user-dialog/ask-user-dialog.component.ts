import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AddingPetComponent } from '../adding-pet/adding-pet.component';
import { AddingPetExistComponent } from '../adding-pet-exist/adding-pet-exist.component';

@Component({
  selector: 'app-ask-user-dialog',
  standalone: true,
  imports: [
    MatDialogModule
  ],
  templateUrl: './ask-user-dialog.component.html',
  styleUrls: ['./ask-user-dialog.component.scss']
})
export class AskUserDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AskUserDialogComponent>, private dialog: MatDialog,) { }

  ngOnInit() {
  }

  onSelect(ownerType: 'new' | 'existing'): void {
    this.dialogRef.close(); // Close the AskUserDialog before opening the other dialog

    if (ownerType === 'new') {
      this.dialog.open(AddingPetComponent, {
        width: '450px',
        data: { ownerType: 'new' }
      });
    } else if (ownerType === 'existing') {
      this.dialog.open(AddingPetExistComponent, {
        width: '450px',
        data: { ownerType: 'existing' }
      });
    }
  }
}
