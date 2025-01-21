import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { APIClient, MedicalRecordDto, MedicalRecordDtoApiResponse } from '@shared/services/api-client/veterinary-api.service';

@Component({
  selector: 'app-edit-medical',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule
  ],
  templateUrl: './edit-medical.component.html',
  styleUrls: ['./edit-medical.component.scss']
})
export class EditMedicalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<EditMedicalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, // Data passed from parent component
    private apiService: APIClient,// Injecting the OwnerService
    private snackBar: MatSnackBar
  ) {
    console.log('Received data in dialog:', data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  records: MedicalRecordDto[] = [];
  saveChanges(): void {
    console.log('Before saving:', this.data);

    // Set the 'createdAt' date to the current date if necessary (can be removed if not needed)
    this.data.createdAt = new Date();

    // Call the update method in the API service and pass the updated record
    this.apiService.updateMedical(this.data.medicalRecordId, this.data).subscribe({
      next: (updatedMedical) => {
        // Notify the user that the record was updated
        this.snackBar.open('Record updated successfully!', 'Close', { duration: 3000 });

        // Update the local records array with the updated data
        this.records = this.records.map((record) =>
          record.medicalRecordId === updatedMedical.medicalRecordId ? updatedMedical : record
        );

        console.log('Medical record successfully updated:', updatedMedical);

        // Close the dialog and pass the updated data back to the parent
        this.dialogRef.close(updatedMedical);
      },
      error: (err) => {
        console.error('Error updating medical record:', err);
        // Optionally, show an error message to the user
        this.snackBar.open('Error updating record', 'Close', { duration: 3000 });
      }
    });
  }


  ngOnInit() {
  }

}
