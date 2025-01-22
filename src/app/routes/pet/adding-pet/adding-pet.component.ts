import { Component, Inject, inject, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import {
  FormControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatStepperModule} from '@angular/material/stepper';
import {MatSelectModule} from '@angular/material/select';
import { AddOwnerAndAnimalDto, AnimalDto, AnimalTypeDto, AnimalTypeDtoIEnumerableApiResponse, APIClient, OwnerDto, OwnerDtoIEnumerableApiResponse } from '@shared/services/api-client/veterinary-api.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-adding-pet',
  standalone: true,
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {displayDefaultIndicatorType: false},
    },
  ],
  imports: [
    MatDialogModule,
    MatSelectModule,
    MatIconModule,
    MatInputModule,
    MatStepperModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MatFormFieldModule,
    MatOptionModule,
    MatDatepickerModule,
    MatCardModule
  ],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './adding-pet.component.html',
  styleUrl: './adding-pet.component.scss'
})
export class AddingPetComponent implements OnInit {
  animal: AnimalDto = new AnimalDto();
  animalowner: AddOwnerAndAnimalDto = new AddOwnerAndAnimalDto();


  //formDisabled: boolean = false;  // To disable other form fields if owner is selected

  ownerType!: 'new' | 'existing';
  title!: string;



  private _formBuilder = inject(FormBuilder);


  constructor(private apiService: APIClient, private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AddingPetComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { ownerType: 'new' | 'existing' },
  )
  {
    this.ownerType = data.ownerType;
    console.log('Owner Type:', data.ownerType); // Should always be 'new' here
  }

  readonly range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  animaltype: AnimalTypeDto[] = []; // Initialize as an empty array by default
  animalControl = new FormControl();

  ngOnInit(): void {
    // Get all animal types from the backend
    this.apiService.getAll4().subscribe((response: AnimalTypeDtoIEnumerableApiResponse) => {
      this.animaltype = response.data ?? [];
    });
  }


  onSubmit() {
    if (this.ownerType === 'new') {
    // Log current data to ensure everything is correct
    console.log('Animal Birth Date:', this.animal.animalBirthDate);
    console.log('Submitting the following data:', this.animalowner);
    console.log('Animal Type ID:', this.animal.animalTypeId);

    // Set animal object in animalowner
    this.animalowner.animals = this.animal;
    this.animalowner.ownerId = 0;
    this.animalowner.animals.animalId = 0;
    this.animalowner.animals.ownerId = this.animalowner.ownerId;

    // Call backend service to add the owner and animal
    this.apiService.addownerwithanimal(this.animalowner).subscribe({
      next: (response) => {
        console.log('Response from backend:', response);
        this.snackBar.open('Animal has been added successfully!', 'Close', { duration: 3000 })
          this.dialogRef.close(); // Close the dialog on successful submission
      },
      error: (err) => {
        console.error('Error adding owner and animals:', err);
        alert('Failed to add owner and animals!');
      },
    });
  }
  else {}
 }

  onCancel(): void {
    this.dialogRef.close(); // Close the dialog
  }

  speciesList: string[] = ['Dog', 'Cat', 'Bird', 'Rabbit', 'Horse'];

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

    'Rabbit': [ 'Himalayan', 'Holland Lop', 'Mini Rex', 'English Angora', 'Mini Lop', 'Dutch',
    'Flemish Giant', 'Lionhead', 'Himalayan', 'Hotot', 'Himalayan', 'American',
    'Miniature Lionhead', 'English Spot', 'New Zealand',  ],
    'Horse': ['Arabian', 'Thoroughbred', 'Quarter Horse', 'Clydesdale', 'Appaloosa', 'Draft', 'Paint',
      'Shetland Pony', 'Tennessee Walker', 'Mustang', 'Morgan', 'Friesian', 'Warmblood', 'Andalusian',
      'Haflinger', 'Percheron', 'Fjord', 'Hanoverian', 'Norwegian Fjord' ]
  };


  breeds: string[] = [];

  // Update breed options based on selected species
  updateBreeds(): void {
    const selectedSpecies = this.animal.species;
    this.breeds = this.breedsBySpecies[selectedSpecies!] || [];
    this.animal.breed = ''; // Reset breed when species changes
  }
  get isBreedDisabled(): boolean {
    return this.breeds.length === 0 || !this.animal.species;
  }
}
