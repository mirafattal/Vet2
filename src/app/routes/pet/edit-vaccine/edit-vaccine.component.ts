import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { APIClient, GetStaffNamesdto, StaffWithRoleDTO, VaccinationDto, ZZVaccineTypeDto, ZZVaccineTypeDtoIEnumerableApiResponse } from '@shared/services/api-client/veterinary-api.service';

@Component({
  selector: 'app-edit-vaccine',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    FormsModule,
    MatSelectModule,
    MatDatepickerModule
  ],
  templateUrl: './edit-vaccine.component.html',
  styleUrls: ['./edit-vaccine.component.scss']
})
export class EditVaccineComponent implements OnInit {

  constructor(
      public dialogRef: MatDialogRef<EditVaccineComponent>,
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

      // Extract the first vaccine record if it exists
      const Vaccine = this.data.vaccines ? this.data.vaccines[0] : null; // Adjust the index based on which record you need
      const VaccineId = Vaccine ? Vaccine.vaccinationId : null;

      if (!VaccineId) {
        console.error('Error: vaccinationId is missing or undefined.');
        this.snackBar.open('Error: Unable to update record. Missing vaccinationId.', 'Close', { duration: 3000 });
        return;
      }

      // Ensure vaccineTypeId is selected and is valid
      if (!this.selectedTypeId) {
        console.error('Error: vaccineTypeId is missing or undefined.');
        this.snackBar.open('Error: Please select a vaccine type.', 'Close', { duration: 3000 });
        return;
      }

      // Create the updatedData object with the required fields
      const updatedData = {
        vaccinationId: VaccineId,
        vaccinationDate: this.data.vaccinationDate,
        nextDueDate: this.data.nextDueDate,
        staffId: this.data.staffId,
        animalId: this.data.animalId,
        vaccineTypeId: this.selectedTypeId // Ensure this is set properly
      } as VaccinationDto;

      console.log('Sending updated data:', updatedData);

      // Call the update method in the API service and pass the updated data
      this.apiService.update16(updatedData).subscribe({
        next: (updatedVaccine) => {
          // Notify the user that the record was updated
          this.snackBar.open('Record updated successfully!', 'Close', { duration: 1000 });

          console.log('Medical record successfully updated:', updatedVaccine);

          // Close the dialog and pass the updated data back to the parent
          this.dialogRef.close(updatedVaccine);
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

            this.fetchSelectedType();
            this.fetchVaccineTypes();
            console.log('Received animalId:', this.data.animalId);
    }


    readonly range = new FormGroup({
          start: new FormControl<Date | null>(null),
          end: new FormControl<Date | null>(null),
        });
    staffWithRoles: StaffWithRoleDTO[] = [];
    doctorNames: StaffWithRoleDTO[] = [];
    StaffName: GetStaffNamesdto[] = []; // Initialize as an empty array by default
    doctorControl = new FormControl();


    vaccineTypes: ZZVaccineTypeDto [] = [];
    selectedTypeId!: number;

    fetchVaccineTypes(){
                this.apiService.getAll21().subscribe(
                  (response: ZZVaccineTypeDtoIEnumerableApiResponse) => {
                    // Extract the 'data' property from the response
                    this.vaccineTypes = response.data!;
                    if (this.vaccineTypes.length > 0) {
                      this.selectedTypeId = this.vaccineTypes[0].vaccineTypeId!; // Set the first ID as default
                    }
                    console.log('Test Records:', this.vaccineTypes);
                  },
                  (error) => {
                    console.error('Error fetching test records', error);
                  }
                );
          }

    fetchSelectedType() {
      if (this.selectedTypeId) {
        this.apiService.getById21(this.selectedTypeId).subscribe(
          (response: ZZVaccineTypeDto) => {
            // Populate addvaccine with vaccine details
            console.log('Fetched vaccine details:', response);
          },
          (error) => {
            console.error('Error fetching vaccine details:', error);
          }
        );
      }
    }
}
