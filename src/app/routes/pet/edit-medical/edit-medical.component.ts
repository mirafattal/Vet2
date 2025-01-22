import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { APIClient, GetStaffNamesdto, MedicalRecordDto, MedicalRecordDtoApiResponse, StaffWithRoleDTO } from '@shared/services/api-client/veterinary-api.service';

@Component({
  selector: 'app-edit-medical',
  standalone: true,
  imports: [
    CommonModule,
    MatSelectModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule
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


  saveChanges(): void {
    console.log('Before saving:', this.data);

    // Extract the first record's `medicalRecordId` if it exists
    const medicalRecord = this.data.records ? this.data.records[0] : null; // Adjust the index based on which record you need
    const medicalRecordId = medicalRecord ? medicalRecord.medicalRecordId : null;

    if (!medicalRecordId) {
      console.error('Error: medicalRecordId is missing or undefined.');
      return;
    }

    // Create the updatedData object with the required fields
    const updatedData = {
      medicalRecordId: medicalRecordId,
      diagnosis: this.data.diagnosis,
      prescribedMedication: this.data.prescribedMedication,
      treatment: this.data.treatment,
      staffId: this.data.staffId,
      animalId: this.data.animalId,
      surgeryDetails: this.data.surgeryDetails,
      createdAt: new Date() // Set the current date if necessary
    } as MedicalRecordDto;

    console.log('Sending updated data:', updatedData);

    // Call the update method in the API service and pass the updated data
    this.apiService.updateMedical(medicalRecordId, updatedData).subscribe({
      next: (updatedMedical) => {
        // Notify the user that the record was updated
        this.snackBar.open('Record updated successfully!', 'Close', { duration: 3000 });

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
    this.apiService.getStaffNames().subscribe((data: GetStaffNamesdto[]) => {
          this.StaffName = data; // Store the doctor names as an array
          },)
          this.apiService.staffwithroles().subscribe((staff) => {
            this.staffWithRoles = staff;
            this.doctorNames = staff.filter((s) => s.roleName === 'Pet Doctor'); // Filter by RoleName
          });
  }


  readonly range = new FormGroup({
        start: new FormControl<Date | null>(null),
        end: new FormControl<Date | null>(null),
      });
  staffWithRoles: StaffWithRoleDTO[] = [];
  doctorNames: StaffWithRoleDTO[] = [];
  StaffName: GetStaffNamesdto[] = []; // Initialize as an empty array by default
  doctorControl = new FormControl();

}
