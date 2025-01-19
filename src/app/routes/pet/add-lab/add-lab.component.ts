import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { APIClient, ZLabResultDto, ZTestNormalRangeDto, ZTestNormalRangeDtoIEnumerableApiResponse } from '@shared/services/api-client/veterinary-api.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-add-lab',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule
  ],
  templateUrl: './add-lab.component.html',
  styleUrls: ['./add-lab.component.scss']
})
export class AddLabComponent implements OnInit {

  labResultForm!: FormGroup;
  animalId!: number;
  addLab: ZLabResultDto = new ZLabResultDto();
  testNormalRange: ZTestNormalRangeDto[] = [];
  selectedtestNormalId!: number;

  constructor(
    private dialog: MatDialog,
    private apiService: APIClient,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AddLabComponent>,
           @Inject(MAT_DIALOG_DATA) public data: { animalId: number})  // Inject the passed data)
           {
            this.animalId = data.animalId; // Access the passed animalId
           }

  ngOnInit(): void {

    this.fetchTestNormal();
  }

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

  // Handle form submission
  onSubmit(): void {
      this.addLab.testNormalRangeId = this.selectedtestNormalId;
      this.addLab.animalId = this.animalId; // Assuming you have the animalId already set
      this.addLab.labResultId = 0;
      this.addLab.testDate = new Date();
      this.addLab.testName = '';

      console.log('submitting lab resluts: ', this.addLab)
      this.apiService.addLabResult(this.addLab).subscribe({
        next: (response) => {
          this.snackBar.open('Lab result added successfully!', 'Close', {
            duration: 3000,
          });
          console.log('lab:', response);
          this.dialogRef.close(); // Close the dialog after successful submission
        },
        error: (error) => {
          console.error('Error adding lab result:', error);
          this.snackBar.open('Failed to add lab result. Please try again.', 'Close', {
            duration: 3000,
          });
        }
      });
  }


    onCancel(): void {
      this.dialogRef.close(); // Close the dialog without saving
    }
}
