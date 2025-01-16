import { Component, Inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { NgpFileUpload } from 'ng-primitives/file-upload';
import { NgIcon, provideIcons } from "@ng-icons/core";
import { heroCloudArrowUp } from "@ng-icons/heroicons/outline";
import { CommonModule } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { AddingMedicalComponent } from '../adding-medical/adding-medical.component';
import { AnimalDto, APIClient, MedicalRecordDto, OwnerDto, VaccinationDto } from '@shared/services/api-client/veterinary-api.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import { PetComponent } from '../pet.component';
import { MtxDrawerRef } from '@ng-matero/extensions/drawer';
import { MTX_DRAWER_DATA } from '@ng-matero/extensions/drawer';
import { MatTabsModule } from '@angular/material/tabs';
import { EditOwnerDialogComponent } from '../edit-owner-dialog/edit-owner-dialog.component';
import { EditPetDialogComponent } from '../edit-pet-dialog/edit-pet-dialog.component';


@Component({
  selector: 'app-pet-detail',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatCardModule,
    MatIconModule,
    NgpFileUpload, NgIcon,
    MatButtonModule, MatDialogModule,
    CommonModule,
    CdkTableModule,
    MatCardModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    RouterModule,
    MatTabsModule
  ],

  viewProviders: [provideIcons({ heroCloudArrowUp })],
  templateUrl: './pet-detail.component.html',
  styleUrl: './pet-detail.component.scss'
})
export class PetDetailComponent implements OnInit {
  records: MedicalRecordDto[] = [];
  animal: AnimalDto | undefined;
  owner: OwnerDto | undefined;
  animalId!: number;
  vaccines: VaccinationDto[] = [];

  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;

  displayedColumns = ['diagnosis', 'surgery', 'treatment', 'createdAt', 'actions'];
  VaccineColumns = ['VaccineName', 'VaccineDate', 'dosage', 'NextDueDate'];


  onClose(): void {
    this.drawerRef.dismiss();
  }
  constructor(
    private router: Router,
    private apiService: APIClient,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    public drawerRef: MtxDrawerRef<PetComponent>,
    @Inject(MTX_DRAWER_DATA) public data: any
  ) {
    console.log('Received Animal ID in PetDetailComponent:', data.animalId);
  }

  ngOnInit(): void {
    this.animalId = this.data?.animalId ?? +this.route.snapshot.paramMap.get('id')!;

  console.log('Resolved Animal ID:', this.animalId);

  if (this.animalId) {
    this.fetchData();
  } else {
    console.error('Invalid or missing Animal ID.');
  }
  }

  fetchData(): void {
    this.fetchMedicalRecords();
    this.fetchAnimalDetails();
    this.fetchOwnerDetails();
    this.fetchVaccinationsDetails();
  }

  fetchMedicalRecords(): void {
    this.apiService.getmedicalrecordsbyanimalId(this.animalId).subscribe(
      (records) => {
        this.records = records; // Directly replace the array with the API response
        console.log('Medical Records:', this.records);
      },
      (error) => {
        console.error('Error fetching medical records', error);
      }
    );
  }

  fetchAnimalDetails(): void {
    this.apiService.getAnimalbyId(this.animalId).subscribe(
      (animals: AnimalDto[]) => {
        if (animals && animals.length > 0) {
          this.animal = animals[0]; // Select the first animal or filter as needed
          console.log('Animal Details:', this.animal);
        } else {
          console.error('No animals found for the given ID.');
        }
      },
      (error) => {
        console.error('Error fetching animal details', error);
      }
    );
  }

  fetchOwnerDetails(): void {
    this.apiService.ownerbyanimalID(this.animalId).subscribe(
      (owner: OwnerDto) => {
        this.owner = owner; // Directly replace with the API response
        console.log('Owner Details:', this.owner);
      },
      (error) => {
        console.error('Error fetching owner details', error);
      }
    );
  }

  onAddPet(): void {
    // Navigate to the add pet route
    this.router.navigate(['add-medical']);
  }

  onFilesSelected(files: FileList | null): void {
    if (files) {
      alert(`Selected ${files.length} files.`);
    }
  }

  editOwner(): void {
    if (this.owner) { // Ensure owner data is available before opening the dialog
      const dialogRef = this.dialog.open(EditOwnerDialogComponent, {
        width: '400px',
        data: { owner: { ...this.owner } } // Pass a copy of the owner data to the dialog
      });

      dialogRef.afterClosed().subscribe((updatedOwner) => {
        if (updatedOwner) {
          this.owner = updatedOwner; // Update the owner data with the changes
          console.log('Updated owner data:', this.owner);
        }
      });
    } else {
      console.error('Owner data is not available.');
    }
  }

  editPet(): void {
    if (this.animal) { // Ensure owner data is available before opening the dialog
      const dialogRef = this.dialog.open(EditPetDialogComponent, {
        width: '500px',
        data: { animal: { ...this.animal } } // Pass a copy of the owner data to the dialog
      });

      dialogRef.afterClosed().subscribe((updatedAnimal) => {
        if (updatedAnimal) {
          this.animal = updatedAnimal; // Update the owner data with the changes
          console.log('Updated animal data:', this.animal);
        }
      });
    } else {
      console.error('Animal data is not available.');
    }
  }

  openDialog(): void {
    this.dialog.open(AddingMedicalComponent, {
            disableClose: true, // Prevents closing on outside click or Escape key
            data: { animalId: this.animalId },
          });
  }

  onView(): void {
    console.log('View action clicked for animal:', this.animalId);
    this.router.navigate(['pet-detail', this.animalId]); // Pass the current animalId to the detail page
  }

  onEdit(row: MedicalRecordDto): void {
    console.log('Edit action clicked for:', row);
    // Add logic to edit details
  }

  onDelete(row: MedicalRecordDto): void {
    console.log('Delete action clicked for:', row);
    // Add logic to delete the row
  }

  fetchVaccinationsDetails(): void {
    this.apiService.getvaccinationbyanimalId(this.animalId).subscribe(
      (vaccines) => {
        this.vaccines = vaccines; // Directly replace the array with the API response
        console.log('Vaccines Records:', this.vaccines);
      },
      (error) => {
        console.error('Error fetching vaccines records', error);
      }
    );
  }

}

