import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { APIClient, GetStaffNamesdto, StaffWithRoleDTO, VaccinationDto, ZZVaccineTypeDto, ZZVaccineTypeDtoIEnumerableApiResponse } from '@shared/services/api-client/veterinary-api.service';

@Component({
  selector: 'app-add-vaccine',
  standalone: true,
  imports: [
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    CommonModule,
    FormsModule,
    MatCardModule,
    MatSelectModule,
    MatDatepickerModule
  ],
  templateUrl: './add-vaccine.component.html',
  styleUrls: ['./add-vaccine.component.scss']
})
export class AddVaccineComponent implements OnInit {

  labResultForm!: FormGroup;
    doctors: StaffWithRoleDTO[] = [];
    staffId!: number;
    animalId!: number;
    addvaccine: VaccinationDto = new VaccinationDto();
    StaffName: GetStaffNamesdto[] = []; // Initialize as an empty array by default
    staffList: GetStaffNamesdto[] = [];
    selectedStaffId: number | undefined |null = null;
    vaccineTypes: ZZVaccineTypeDto [] = [];
    selectedTypeId!: number;

    constructor(
      private dialog: MatDialog,
      private apiService: APIClient,
      private snackBar: MatSnackBar,
      public dialogRef: MatDialogRef<AddVaccineComponent>,
             @Inject(MAT_DIALOG_DATA) public data: { animalId: number})  // Inject the passed data)
             {
              this.animalId = data.animalId; // Access the passed animalId
             }

    ngOnInit(): void {
this.getStaffNames();
this.fetchVaccineTypes();
this.fetchSelectedType();
    }


    // Handle form submission
    onSubmit(): void {
      this.addvaccine.vaccinationDate = new Date();
      this.addvaccine.vaccinationId = 0;
      this.addvaccine.animalId = this.animalId;
      this.addvaccine.staffId = this.selectedStaffId!;
      this.addvaccine.vaccineTypeId = this.selectedTypeId;
        console.log('submitting lab resluts: ', this.addvaccine)
        this.apiService.add16(this.addvaccine).subscribe({
          next: (response) => {
            this.snackBar.open('Vaccine added successfully!', 'Close', {
              duration: 3000,
              panelClass: ['custom-snackbar']
            });
            console.log('response:', response);
            this.dialogRef.close(); // Close the dialog after successful submission
          },
          error: (error) => {
            console.error('Error adding vaccine:', error);
            this.snackBar.open('Failed to add vaccine. Please try again.', 'Close', {
              duration: 3000,
            });
          }
        });
    }


    getStaffNames() {
      this.apiService.staffwithroles().subscribe((staff: StaffWithRoleDTO[]) => {
        console.log('Staff data received:', staff); // Debug log
        // Filter the staff to include only 'Pet Doctor' or 'Horse Doctor'
        this.staffList = staff.filter(
          (s) => s.roleName === 'Pet Doctor' || s.roleName === 'Horse Doctor'
        );

        // Set the selected staff to the first doctor if available
        this.selectedStaffId = this.staffList.length > 0 ? this.staffList[0].staffId : null;

        // Fetch appointments for the selected staff
      });
    }
      onCancel(): void {
        this.dialogRef.close(); // Close the dialog without saving
      }

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
