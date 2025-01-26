import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { APIClient, ZLabResultDto, ZLabResultDtoApiResponse, ZTestNormalRangeDto, ZTestNormalRangeDtoIEnumerableApiResponse } from '@shared/services/api-client/veterinary-api.service';

@Component({
  selector: 'app-edit-lab',
  standalone: true,
  imports: [
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatDatepickerModule,
    MatSelectModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './edit-lab.component.html',
  styleUrls: ['./edit-lab.component.scss']
})
export class EditLabComponent implements OnInit {

 constructor(
       public dialogRef: MatDialogRef<EditLabComponent>,
       @Inject(MAT_DIALOG_DATA) public data: any, // Data passed from parent component
       private apiService: APIClient,// Injecting the OwnerService
       private snackBar: MatSnackBar
     ) {
       console.log('Received data in dialog:', data);
     }

     onNoClick(): void {
       this.dialogRef.close();
     }

     dataSource: ZLabResultDto[] = [];

     saveChanges(): void {
       console.log('Before saving:', this.data);
       const LabArrays = Object.values(this.data.labResults) as ZLabResultDto[];

       if (!Array.isArray(LabArrays) || LabArrays.length === 0) {
        console.error('Error: invoices is missing or empty.');
        this.snackBar.open('Invoices are missing or empty. Please try again.', 'Close', { duration: 3000 });
        return;
      }

       const firstLab = LabArrays[0];
       const labId = firstLab?.labResultId;

       if (!labId) {
        console.error('Error: invoiceId is missing or undefined.');
        this.snackBar.open('Invoice ID is missing. Please try again.', 'Close', { duration: 3000 });
        return;
      }

       if (!labId) {
         console.error('Error: vaccinationId is missing or undefined.');
         this.snackBar.open('Error: Unable to update record. Missing LabId.', 'Close', { duration: 3000 });
         return;
       }

       // Ensure vaccineTypeId is selected and is valid
       if (!this.selectedtestNormalId) {
         console.error('Error: vaccineTypeId is missing or undefined.');
         this.snackBar.open('Error: Please select a lab type.', 'Close', { duration: 3000 });
         return;
       }

       // Create the updatedData object with the required fields
       const updatedData = {
         labResultId: labId,
         testDate: this.data.testDate,
         testNormalRangeId: this.selectedtestNormalId,
         animalId: this.data.animalId,
         testName: '',
       } as ZLabResultDto;

       console.log('Sending updated data:', updatedData);

       // Call the update method in the API service and pass the updated data
       this.apiService.update18(updatedData).subscribe({
        next: (response: ZLabResultDtoApiResponse) => {
          // Check if the response is successful and contains data
          if (response.success && Array.isArray(response.data)) {
            this.dataSource = response.data; // Assign the array of ZLabResultDto
          } else {
            console.error('Error: Invalid response structure or no data found.');
            this.snackBar.open('No data found or invalid response.', 'Close', { duration: 3000 });
          }

          // Notify the user that the record was updated
          this.snackBar.open('Record updated successfully!', 'Close', { duration: 1000 });

          // Close the dialog and pass the updated data back to the parent
          this.dialogRef.close(response.data);
        },
         error: (err) => {
           console.error('Error updating medical record:', err);

           // Optionally, show an error message to the user
           this.snackBar.open('Error updating record', 'Close', { duration: 3000 });
         }
       });
     }


      testNormalRange: ZTestNormalRangeDto[] = [];
      selectedtestNormalId!: number;
  fetchTestNormal(): void {
   this.apiService.getAll19().subscribe(
   (response: ZTestNormalRangeDtoIEnumerableApiResponse) => {
    // Extract the 'data' property from the response
    this.testNormalRange = response.data!; // Assuming 'data' contains the array of ZTestNormalRangeDto
    console.log('Test Records:', this.testNormalRange);
 },
  (error) => {
   console.error('Error fetching test records', error);
    }
    );
}

   ngOnInit() {
  console.log('Received animalId:', this.data.animalId);
  this.fetchTestNormal();
   }





}
