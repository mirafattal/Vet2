import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AdoptionQuestionnaireDto, AdoptionQuestionnaireDtoIEnumerableApiResponse, APIClient, PetForAdoptionDto, PetForAdoptionDtoIEnumerableApiResponse } from '@shared/services/api-client/veterinary-api.service';

@Component({
  selector: 'app-adoption',
  standalone: true,
  imports: [
    MatSelectModule,
    MatCardModule,
    CommonModule,
    FormsModule,
    MatInputModule
  ],
  templateUrl: './adoption.component.html',
  styleUrls: ['./adoption.component.scss']
})
export class AdoptionComponent implements OnInit {

  // Arrays to store the data for pets and questionnaires
  petsforadoption: PetForAdoptionDto[] = [];
  questionnaires: AdoptionQuestionnaireDto[] = [];

  // Variables for search and filter functionality (optional)
  searchQuery: string = '';
  selectedStatus: number = 0;

  constructor(private apiService: APIClient,) {}

  ngOnInit(): void {
    // Fetch the data when the component is initialized
    this.fetchPets();
    this.fetchQuestionnaires();
  }

  // Fetch pets for adoption from the service
  fetchPets(): void {
    this.apiService.getAll12().subscribe(
      (response: PetForAdoptionDtoIEnumerableApiResponse) => {
        // Access the array from the response and assign it to petsforadoption
        this.petsforadoption = response.data ?? []; // Fallback to an empty array if `data` is null or undefined
      },
      (error) => {
        console.error('Error fetching pets:', error);
        this.petsforadoption = []; // Ensure the array is never null
      }
    );
  }

  // Fetch adoption questionnaires from the service
  fetchQuestionnaires(): void {
    this.apiService.getAll().subscribe(
      (response: AdoptionQuestionnaireDtoIEnumerableApiResponse) => {
        // Access the array from the response and assign it to petsforadoption
        this.questionnaires = response.data ?? []; // Fallback to an empty array if `data` is null or undefined
      },
      (error) => {
        console.error('Error fetching pets:', error);
        this.questionnaires = []; // Ensure the array is never null
      }
    );
  }



  // Optional: Handle filtering by status (approved, pending, etc.)
  filterByStatus(): void {
    if (this.selectedStatus) {
      this.petsforadoption = this.petsforadoption.filter((pet) => pet.adoptionStatusId === this.selectedStatus);
    } else {
      this.fetchPets();
      this.fetchQuestionnaires(); // Reset to original data when status filter is cleared
    }
  }

}
