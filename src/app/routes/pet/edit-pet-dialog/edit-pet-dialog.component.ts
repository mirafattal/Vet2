import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { APIClient } from '@shared/services/api-client/veterinary-api.service';

@Component({
  selector: 'app-edit-pet-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './edit-pet-dialog.component.html',
  styleUrls: ['./edit-pet-dialog.component.scss']
})
export class EditPetDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<EditPetDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, // Data passed from parent component
    private apiService: APIClient, // Injecting the OwnerService
    private snackBar: MatSnackBar
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  openSnackBar(message: string, type: 'success' | 'error' | 'warning' | 'info') {
    const panelClass = `custom-snackbar-${type}`;
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: [panelClass]
    });
  }
  saveChanges(): void {
    this.apiService.update3(this.data.animal).subscribe({
      next: (updatedAnimal) => {
        console.log('Animal successfully updated:', updatedAnimal);
        this.openSnackBar('Animal added successfully!', 'success');
        this.dialogRef.close(updatedAnimal); // Return the updated owner data to the parent
      },
      error: (err) => {
        console.error('Error updating animal:', err);
        // Optionally, show an error message to the user
      }
    });
  }

  ngOnInit() {
  }

}
