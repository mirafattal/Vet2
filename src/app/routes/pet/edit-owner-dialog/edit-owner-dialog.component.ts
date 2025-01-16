import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { APIClient } from '@shared/services/api-client/veterinary-api.service';

@Component({
  selector: 'app-edit-owner-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './edit-owner-dialog.component.html',
  styleUrls: ['./edit-owner-dialog.component.scss']
})
export class EditOwnerDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<EditOwnerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, // Data passed from parent component
    private apiService: APIClient // Injecting the OwnerService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveChanges(): void {
    this.apiService.update11(this.data.owner).subscribe({
      next: (updatedOwner) => {
        console.log('Owner successfully updated:', updatedOwner);
        this.dialogRef.close(updatedOwner); // Return the updated owner data to the parent
      },
      error: (err) => {
        console.error('Error updating owner:', err);
        // Optionally, show an error message to the user
      }
    });
  }

  ngOnInit() {
  }

}
