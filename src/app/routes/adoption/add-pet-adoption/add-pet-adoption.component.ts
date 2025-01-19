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
 private http: HttpClient
  ) { }

  ngOnInit() {
  }

  petdetails: AddPetForAdoptionDto = new AddPetForAdoptionDto ();

  addPetWithImage(): void {
    console.log('Starting addPetWithImage()'); // Debug: Method entry point

    // Debug: Log the current state of petdetails
    console.log('Pet details before API call:', this.petdetails);

    this.petdetails.petForAdoptionId = 0;
    this.petdetails.adoptionStatusId = 1;
    this.petdetails.imageUrl = 'default-poster.jpg';

    // Create FormData object to send the image
    const formData = new FormData();
    if (this.selectedFile) {
      formData.append('image', this.selectedFile as Blob, this.selectedFile.name);
    }

    // Call the API with all required parameters including FormData
    this.apiService.addPetwithImage(
      this.petdetails.petForAdoptionId,
      this.petdetails.breed!,
      this.petdetails.species!,
      this.petdetails.petBirthDate,
      this.petdetails.petCondition!,
      this.petdetails.gender!,
      this.petdetails.weight,
      this.petdetails.adoptionStatusId,
      this.petdetails.petName!,
      this.petdetails.imageUrl || 'default-poster.jpg',
      {
        data: this.selectedFile,
        fileName: this.selectedFile?.name!,
      }
    ).subscribe({
      next: (response) => {
        console.log('Pet added successfully:', response);
      },
      error: (error) => {
        console.error('Error adding pet:', error);
        alert('Failed to add pet. Please check your input and try again.');
      }
    });
  }



  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0] as unknown as File;
    } else {
      this.selectedFile = null;
    }
  }



  fileSelected: boolean = false;   // Track if a file is selected
  selectedFile: File | null = null; // Store selected file as FileParameter
  // onFileSelected(event: Event): void {
  //   const fileInput = event.target as HTMLInputElement;
  //   const file = fileInput?.files?.[0];

  //   if (file) {
  //     this.fileSelected = true;
  //     this.selectedFile = {
  //       data: file,
  //       fileName: file.name,
  //     };
  //   } else {
  //     this.fileSelected = false;
  //     this.selectedFile = undefined; // Clear the selected file if no file is selected
  //   }
  // }


onCancel(): void {
  this.dialogRef.close();
}

}
