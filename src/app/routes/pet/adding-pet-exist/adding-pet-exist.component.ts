import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AddingPetComponent } from '../adding-pet/adding-pet.component';
import { AnimalDto, AnimalTypeDto, AnimalTypeDtoIEnumerableApiResponse, APIClient, OwnerDto } from '@shared/services/api-client/veterinary-api.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ReplaySubject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-adding-pet-exist',
  standalone: true,
  imports: [
    NgxMatSelectSearchModule,
    MatSelectModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    CommonModule,
    MatTableModule,
    MatRadioModule
  ],
  templateUrl: './adding-pet-exist.component.html',
  styleUrls: ['./adding-pet-exist.component.scss']
})
export class AddingPetExistComponent implements OnInit {
  selectedOwnerName: string | null | undefined = null; // Display name for the selected owner
  selectedOwnerId: number | undefined; // Currently selected owner's ID
  owners: OwnerDto[] = [];
  ownerType!: 'new' | 'existing';
  searchTerm: string = '';
  AddanimalOnly: AnimalDto = new AnimalDto();

  constructor(private apiService: APIClient,
    public dialogRef: MatDialogRef<AddingPetExistComponent>,
      @Inject(MAT_DIALOG_DATA) public data: { ownerType: 'new' | 'existing' },) {
    console.log('Owner Type:', data.ownerType); // Should always be 'existing' here
   }

    loadOwnerNames(): void {
       this.apiService.getAllOwnerNames().subscribe(
         (data) => {
           this.owners = data;  // Store owners in the owners
         },
         (error) => {
           console.error('Error fetching owner names:', error);
         }
       );
     }

  animaltype: AnimalTypeDto[] = []; // Initialize as an empty array by default
  animalControl = new FormControl();
  ngOnInit() {
    this.loadOwnerNames();
    console.log('Owners fetched:', this.owners);
    this.onSearch();

    this.apiService.getAll4().subscribe((response: AnimalTypeDtoIEnumerableApiResponse) => {
          this.animaltype = response.data ?? [];
        });
  }

  displayedColumns: string[] = ['select', 'fullName'];

  onSearch(): void {
    if (!this.searchTerm.trim()) {
      this.owners = [];
      return;
    }
    const search = this.searchTerm?.trim() || null;

    this.apiService.searchOwnerNames(search!).subscribe({
      next: (response) => {
        if (response) {
          this.owners = response;
        }
      },
      error: (error) => {
        console.error('Error fetching owners:', error);
        this.owners = []; // Clear any previous results
      }
    });
  }

  onOwnerSelectionChange(ownerId: number): void {
    console.log('Selected Owner ID:', ownerId);
    this.selectedOwnerId = ownerId;
  }

  // Method to handle when an owner is selected
 onAddAnimalwithExistingOwner(){
      console.log('Selected Owner:', this.selectedOwnerId);
      this.AddanimalOnly.ownerId = this.selectedOwnerId; // Use the selected owner ID
      this.AddanimalOnly.animalId = 0;
      this.apiService.add3(this.AddanimalOnly).subscribe({
        next: (response) => {
          console.log('Response from backend:', response);
          alert('Animal added successfully to existing Owner!');
          this.dialogRef.close(); // Close the dialog on successful submission
        }
      })
    }

 onCancel(): void {
  this.dialogRef.close(); // Close the dialog
}

speciesList: string[] = ['Dog', 'Cat', 'Bird'];

  breedsBySpecies: { [key: string]: string[] } = {
    'Dog': ['Labrador', 'Beagle', 'Bulldog', 'German Shepherd', 'Golden Retriever', 'Poodle',
    'Rottweiler', 'Chihuahua', 'Dachshund', 'Boxer', 'Shih Tzu', 'Yorkshire Terrier',
    'Cocker Spaniel', 'Siberian Husky', 'Doberman Pinscher', 'Great Dane', 'Pomeranian',],

    'Cat': ['Persian', 'Siamese', 'Maine Coon', 'Bengal', 'Ragdoll', 'British Shorthair',
    'Abyssinian', 'Russian Blue', 'Sphynx', 'Scottish Fold', 'Exotic Shorthair', 'Birman',
    'Oriental Shorthair', 'Savannah', 'Devon Rex', 'Burmese', 'Manx', 'Himalayan',],

    'Bird': ['Parrot', 'Canary', 'Sparrow', 'Finch', 'Cockatiel', 'Budgerigar', 'Lovebird',
    'Macaw', 'Conure', 'Amazons', 'African Grey', 'Eclectus', 'Quaker Parrot',
    'Pionus', 'Lorikeet', 'Finch', 'Pheasant', 'Dove', 'Peacock', 'Parakeet',],

    'Rabbit': [
    'Himalayan', 'Holland Lop', 'Mini Rex', 'English Angora', 'Mini Lop', 'Dutch',
    'Flemish Giant', 'Lionhead', 'Himalayan', 'Hotot', 'Himalayan', 'American',
    'Miniature Lionhead', 'English Spot', 'New Zealand',  ],
    'Horse': [
      'Arabian', 'Thoroughbred', 'Quarter Horse', 'Clydesdale', 'Appaloosa', 'Draft', 'Paint',
      'Shetland Pony', 'Tennessee Walker', 'Mustang', 'Morgan', 'Friesian', 'Warmblood', 'Andalusian',
      'Haflinger', 'Percheron', 'Fjord', 'Hanoverian', 'Norwegian Fjord'
    ]
  };


  breeds: string[] = [];

  // Update breed options based on selected species
  updateBreeds(): void {
    const selectedSpecies = this.AddanimalOnly.species;
    this.breeds = this.breedsBySpecies[selectedSpecies!] || [];
    this.AddanimalOnly.breed = ''; // Reset breed when species changes
  }
  get isBreedDisabled(): boolean {
    return this.breeds.length === 0 || !this.AddanimalOnly.species;
  }
}
