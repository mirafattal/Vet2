import { Component, OnInit } from '@angular/core';
import { ClientToolbarComponent } from '../client-toolbar/client-toolbar.component';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { APIClient, PetForAdoptionDto, PetForAdoptionDtoIEnumerableApiResponse } from '@shared/services/api-client/veterinary-api.service';

@Component({
  selector: 'app-pet-for-adoption',
  standalone: true,
  imports: [
    ClientToolbarComponent,
    MatCardModule,
    CommonModule
  ],
  templateUrl: './pet-for-adoption.component.html',
  styleUrls: ['./pet-for-adoption.component.scss']
})
export class PetForAdoptionComponent implements OnInit {

  pets: PetForAdoptionDto[] = [];

  constructor(private router: Router, private apiService: APIClient) {}

  fetchPets(): void {
    this.apiService.getAvailablePets().subscribe(
      (response:PetForAdoptionDto[]) => {
        // Ensure pets are correctly mapped while keeping their type
        this.pets = (response ?? []).map((pet) => {
          return {
            ...pet,
            imageUrl: this.getFullImageUrl(pet.imageUrl || ""), // Ensure imageUrl is properly transformed
          } as PetForAdoptionDto; // Explicitly cast the object as PetForAdoptionDto
        });
      },
      (error) => {
        console.error('Error fetching pets:', error);
        this.pets = []; // Ensure the array is never null
      }
    );
  }



  getFullImageUrl(imagePath: string): string {
    const fullUrl = `https://localhost:7175/api/PetForAdoption/DownloadImage?imagePath=${encodeURIComponent(imagePath)}`;
    console.log('Generated image URL:', fullUrl); // Log the URL to check
    return fullUrl;
  }

  adoptPet(petForAdoptionId: number | undefined): void {
    if (!petForAdoptionId) {
      console.error('PetForAdoptionId is undefined!');
      return;
    }

    this.router.navigate(['/adoption-questionnaire'], { queryParams: { petForAdoptionId } });
  }

  ngOnInit() {
    this.fetchPets();
  }

  navigateTo(link: string): void {
    this.router.navigate([link]);
  }

}
