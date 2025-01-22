import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { AdoptionQuestionnaireDto, APIClient, GetAllAdoptionQuestwithPetNameDto, PetForAdoptionDto, PetForAdoptionDtoIEnumerableApiResponse } from '@shared/services/api-client/veterinary-api.service';
import { AddPetAdoptionComponent } from './add-pet-adoption/add-pet-adoption.component';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ViewQuestComponent } from './view-quest/view-quest.component';

@Component({
  selector: 'app-adoption',
  standalone: true,
  imports: [
    MatTableModule,
    MatSelectModule,
    MatCardModule,
    CommonModule,
    FormsModule,
    MatInputModule,
    MatTabsModule,
    MatIconModule
  ],
  templateUrl: './adoption.component.html',
  styleUrls: ['./adoption.component.scss']
})
export class AdoptionComponent implements OnInit {

  // Arrays to store the data for pets and questionnaires
  petsforadoption: PetForAdoptionDto[] = [];
  questionnaires: AdoptionQuestionnaireDto[] = [];
  selectedPetName: string = ''; // Store the selected pet name
  displayedColumns: string[] = ['petName', 'occupation', 'createdAt', 'hasOwnedPetBefore', 'status', 'actions'];


  // Variables for search and filter functionality (optional)
  searchQuery: string = '';
  selectedStatus: number = 0;

  constructor(private apiService: APIClient, private router: Router, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    // Fetch the data when the component is initialized
    this.fetchPets();
    this.fetchQuestionnaires();
    this.onPetNameChange();
  }

  // Fetch pets for adoption from the service
  fetchPets(): void {
    this.apiService.getAll12().subscribe(
      (response: PetForAdoptionDtoIEnumerableApiResponse) => {
        // Ensure pets are correctly mapped while keeping their type
        this.petsforadoption = (response.data ?? []).map((pet) => {
          return {
            ...pet,
            imageUrl: this.getFullImageUrl(pet.imageUrl || ""), // Ensure imageUrl is properly transformed
          } as PetForAdoptionDto; // Explicitly cast the object as PetForAdoptionDto
        });
      },
      (error) => {
        console.error('Error fetching pets:', error);
        this.petsforadoption = []; // Ensure the array is never null
      }
    );
  }



  getFullImageUrl(imagePath: string): string {
    const fullUrl = `https://localhost:7175/api/PetForAdoption/DownloadImage?imagePath=${encodeURIComponent(imagePath)}`;
    console.log('Generated image URL:', fullUrl); // Log the URL to check
    return fullUrl;
  }



  viewAdoptionDetails(petId: number): void {
    // Navigate to the adoption questionnaire view related to the petId
    this.router.navigate(['dash-adoption-quest', petId]);
  }

  fetchQuestionnaires(): void {
    this.apiService.getAllPendingStatus().subscribe(
      (response: AdoptionQuestionnaireDto[]) => {
        this.questionnaires = response;
        console.log('Questionnaires:', this.questionnaires);
      },
      (error) => {
        console.error('Error fetching medical records', error);
      }
    );
  }



  approveQuestionnaire(questionnaireId: number): void {
    this.apiService.approveQuest(questionnaireId).subscribe(
      (response) => {
        console.log('Questionnaire approved successfully');

        // Optionally, update the status locally to reflect the change
        this.updateQuestionnaireStatus(questionnaireId, 'Approved');
        this.snackBar.open('Questionnaire has been approved. Congrats!', 'Close', { duration: 3000 });
      },
      (error) => {
        console.error('Error approving questionnaire:', error);
      }
    );
  }

  denyQuestionnaire(questionnaireId: number): void {
    this.apiService.rejectQuest(questionnaireId).subscribe(
      (response) => {
        console.log('Questionnaire denied successfully');

        // Optionally, update the status locally to reflect the change
        this.updateQuestionnaireStatus(questionnaireId, 'Denied');
        this.snackBar.open('Questionnaire has been rejected!', 'Close', { duration: 3000 });
      },
      (error) => {
        console.error('Error approving questionnaire:', error);
      }
    );
  }


  // Update questionnaire status locally
  private updateQuestionnaireStatus(questionnaireId: number, status: string): void {
    const questionnaire = this.questionnaires.find(q => q.adoptionQuestionnaireId === questionnaireId);
    if (questionnaire) {
      questionnaire.questionStatus = status;
    }
  }


  onPetNameChange(): void {
    if (this.selectedPetName === 'None') {
      // If "None" is selected, fetch all questionnaires
      this.fetchQuestionnaires();
    } else {
      // Otherwise, fetch questionnaires filtered by pet name
      const selectedPet = this.petsforadoption.find(pet => pet.petName === this.selectedPetName);
      const petId = selectedPet ? selectedPet.petForAdoptionId : null;

      if (petId !== null) {
        this.fetchQuestionnairesByPetId(petId!);
      }
    }
  }

  fetchQuestionnairesByPetId(petId: number): void {
    // Call the service to fetch questionnaires by pet ID
    this.apiService.getByPetID(petId).subscribe(
      (response: AdoptionQuestionnaireDto[]) => {
        this.questionnaires = response;
      },
      (error) => {
        console.error('Error fetching questionnaires by pet ID:', error);
      }
    );
  }

  readonly dialog = inject(MatDialog);
  onAddPetForAdoption(): void {
    const dialogRef = this.dialog.open(AddPetAdoptionComponent, {
      disableClose: true, // Prevents closing on outside click or Escape key
      width: '500px',
      height: '400px'
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.fetchPets(); // Refresh the pet list if a pet was added
      }
    });
  }


  onDeletePet(petId: number): void {
    if (confirm('Are you sure you want to delete this pet?')) {
      this.apiService.deletePetWithQuest(petId).subscribe(
        () => {
          this.snackBar.open('Pet deleted successfully', 'Close', { duration: 3000 });
          // Refresh the pet list after deletion
          this.fetchPets();
        },
        (error) => {
          console.error('Error deleting pet:', error);
          this.snackBar.open('Error deleting pet', 'Close', { duration: 3000 });
        }
      );
    }
  }

  onMarkAsAdopted(petForAdoptionId: number): void {
    this.updatePetAsAdopted(petForAdoptionId);
    this.apiService.markPetAsadopted(petForAdoptionId).subscribe(() => {
      this.petsforadoption = this.petsforadoption.filter(
        pet => pet.petForAdoptionId !== petForAdoptionId
      );
      this.snackBar.open('Pet marked as adopted successfully.', 'Close', { duration: 3000 });
    });
  }

  updatePetAsAdopted(petForAdoptionId: number): void {
    // Find the pet in the list and update its isAdopted property
    const pet = this.petsforadoption.find(p => p.petForAdoptionId === petForAdoptionId);
    if (pet) {
      pet.adoptionStatusId = 3;
    }
  }

  getPetNameById(petForAdoptionId: number): string {
    // Here you can replace the mock data with actual data fetching logic

    const pet = this.petsforadoption.find(p => p.petForAdoptionId === petForAdoptionId);
    return pet ? pet.petName! : 'Unknown Pet';
  }


  openViewDialog(questionnaire: any): void {
    console.log('Questionnaire:', questionnaire);
    // Pass the petAdoptionId to the method to get the petName
    const petName = this.getPetNameById(questionnaire.petForAdoptionId);

    this.dialog.open(ViewQuestComponent, {
      data: {
        petName: petName, // Pass only the pet name
        questionnaire: questionnaire, // Optionally pass the entire questionnaire if needed
      },
    });
  }
}
