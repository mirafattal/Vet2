import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatFormFieldModule,  } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerToggle } from '@angular/material/datepicker';
import { AddPetForAdoptionDto, APIClient, FileParameter } from '@shared/services/api-client/veterinary-api.service';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatStepperModule } from '@angular/material/stepper';
import { HttpClient } from '@angular/common/http';
import { File } from 'buffer';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-pet-adoption',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatOptionModule,
    MatStepperModule,
    MatNativeDateModule,
    MatIconModule,
    MatDatepickerToggle,
    MatFormField,
    MatInput,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    CommonModule,
    MatDialogModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './add-pet-adoption.component.html',
  styleUrls: ['./add-pet-adoption.component.scss']
})
export class AddPetAdoptionComponent implements OnInit {


  constructor(public dialogRef: MatDialogRef<AddPetAdoptionComponent>, private apiService: APIClient,
 private http: HttpClient, private snackBar: MatSnackBar
  ) {
    this.petdetails = {
     petForAdoptionId: 0,
     breed: '',
     species: '',
     petBirthDate: null!,
     petCondition: '',
     gender: '',
     weight: 0,
     adoptionStatusId: 1,
     petName: '',
     imageUrl: 'default-poster.jpg',
      init: function (_data?: any): void {
        throw new Error('Function not implemented.');
      },
      toJSON: function (data?: any) {
        throw new Error('Function not implemented.');
      },
    };

  }

  ngOnInit() {

  }

  petdetails: AddPetForAdoptionDto;




  addPetWithImage(): void {
    console.log('Starting addPetWithImage()'); // Debug: Method entry point

    // Debug: Log the current state of petdetails
    console.log('Pet details before API call:', this.petdetails);
    const fileParameter: FileParameter = {
      data: this.selectedFile,
      fileName: this.selectedFile!.name,
    };

    const petForAdoptionId = 0;
    const adoptionStatusId = 1 as number;  // Type assertion to number
    const breed = this.petdetails.breed;
    const species = this.petdetails.species;
    const petBirthDate = this.petdetails.petBirthDate ? this.petdetails.petBirthDate : null; // Or use new Date() if a default is needed
    const gender = this.petdetails.gender;
    const weight = this.petdetails.weight;
    const petName = this.petdetails.petName;
    const petCondition = this.petdetails.petCondition;
    const ImageUrl = this.selectedFile ? this.selectedFile.name : 'default-poster.jpg';

    // Call the API with all required parameters including FormData
    this.apiService.addPetwithImage(
     petForAdoptionId, breed!, species!, petBirthDate!, petCondition!, gender!, weight, adoptionStatusId, petName!,
     ImageUrl,
      fileParameter
    ).subscribe({
      next: (response) => {
        console.log('Pet added successfully:', response);
        this.snackBar.open('Pet added successfully!', 'Close', { duration: 3000 })
        this.dialogRef.close();
      },
      error: (error) => {
        console.error('Error adding pet:', error);
        this.snackBar.open('Failed to add Pet!', 'Close', { duration: 3000 })
      }
    });
  }



  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0] as unknown as File;
      console.log('Selected file:', this.selectedFile);
    } else {
      this.selectedFile = null;
      console.log('No file selected');
    }
  }



  //fileSelected: boolean = false;   // Track if a file is selected
  selectedFile: File | null = null; // Store selected file as FileParameter


onCancel(): void {
  this.dialogRef.close();
}

}
