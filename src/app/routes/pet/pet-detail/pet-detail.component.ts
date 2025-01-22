import { Component, Inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { AddingMedicalComponent } from '../adding-medical/adding-medical.component';
import { AnimalDto, APIClient, AppointmentDto, FileParameter, MedicalRecordDto, OwnerDto, VaccinationDto, XrayImageDto, ZLabResultDto, ZLabResultResponseDto, ZTestNormalRangeDto, ZTestNormalRangeDtoIEnumerableApiResponse, ZZVaccineTypeDto, ZZVaccineTypeDtoIEnumerableApiResponse } from '@shared/services/api-client/veterinary-api.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import { PetComponent } from '../pet.component';
import { MtxDrawerRef } from '@ng-matero/extensions/drawer';
import { MTX_DRAWER_DATA } from '@ng-matero/extensions/drawer';
import { MatTabsModule } from '@angular/material/tabs';
import { EditOwnerDialogComponent } from '../edit-owner-dialog/edit-owner-dialog.component';
import { EditPetDialogComponent } from '../edit-pet-dialog/edit-pet-dialog.component';
import { AddLabComponent } from '../add-lab/add-lab.component';
import { ConfirmDialogComponent } from 'app/routes/confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddVaccineComponent } from '../add-vaccine/add-vaccine.component';
import { AddAppDialogComponent } from '../add-app-dialog/add-app-dialog.component';
import { EditMedicalComponent } from '../edit-medical/edit-medical.component';
import { EditVaccineComponent } from '../edit-vaccine/edit-vaccine.component';

@Component({
  selector: 'app-pet-detail',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule, MatDialogModule,
    CommonModule,
    CdkTableModule,
    MatCardModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    RouterModule,
    MatTabsModule,

  ],
  templateUrl: './pet-detail.component.html',
  styleUrl: './pet-detail.component.scss'
})
export class PetDetailComponent implements OnInit {
  records: MedicalRecordDto[] = [];
  animal: AnimalDto | undefined;
  owner: OwnerDto | undefined;
  animalId!: number;
  vaccines: VaccinationDto[] = [];
  appoints: AppointmentDto[] = [];
  labResults: ZLabResultDto[] = [];
  testNormal: ZTestNormalRangeDto[] = [];
  vaccineTypes: ZZVaccineTypeDto[] = [];


  displayedColumns = ['diagnosis', 'surgery', 'medication', 'createdAt', 'treatment', 'actions'];
  VaccineColumns = ['VaccineName', 'VaccineDate', 'dosage', 'NextDueDate', 'actions'];
  LabColumns =  ['TestName', 'Result', 'Unit', 'isNormal', 'TestDate', 'actions'];
  AppointsColumns =  ['AppointmentReason', 'LastVisit'];


  onClose(): void {
    this.drawerRef.dismiss();
  }
  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
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
    this.fetchXrayByAnimalId();
    this.fetchLabResults();
    this.fetchTestNormal();
    this.fetchAppoints();
    this.fetchVaccineTypes();
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

  editMedical(): void {
    console.log('Medical Records:', this.records); // Log records to check if they are available

  if (this.records && this.records.length > 0) {
    const record = this.records[0]; // Access the first record or you can iterate through the array
    console.log('Editing record with Animal ID:', record.animalId);
  }
    if (this.records) { // Ensure owner data is available before opening the dialog
      const dialogRef = this.dialog.open(EditMedicalComponent, {
        width: '400px',
        data: { records: { ...this.records }, animalId: this.animalId} // Pass a copy of the owner data to the dialog
      });

      dialogRef.afterClosed().subscribe((updatedMedical) => {
        if (updatedMedical) {
          this.records = updatedMedical; // Update the owner data with the changes
          console.log('Updated medical data:', this.records);
        }
      });
    } else {
      console.error('Medical data is not available.');
    }
  }


  editVaccine(): void {
    console.log('Vaccine Records:', this.vaccines); // Log records to check if they are available

  if (this.vaccines && this.vaccines.length > 0) {
    const vaccine = this.vaccines[0]; // Access the first record or you can iterate through the array
    console.log('Editing record with Animal ID:', vaccine.animalId);
  }
    if (this.records) { // Ensure owner data is available before opening the dialog
      const dialogRef = this.dialog.open(EditVaccineComponent, {
        width: '400px',
        data: { vaccines: { ...this.vaccines }, animalId: this.animalId} // Pass a copy of the owner data to the dialog
      });

      dialogRef.afterClosed().subscribe((updatedVaccine) => {
        if (updatedVaccine) {
          this.vaccines = updatedVaccine; // Update the owner data with the changes
          console.log('Updated medical data:', this.vaccines);
        }
      });
    } else {
      console.error('Medical data is not available.');
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

  fetchAppoints(): void {
    this.apiService.getappointmentbyanimalId(this.animalId).subscribe(
      (response) => {
        this.appoints = response; // Directly replace the array with the API response
        console.log('Appoints Results Records:', this.appoints);
      },
      (error) => {
        console.error('Error fetching appoints records', error);
      }
    );
  }

  fetchLabResults(): void {
    this.apiService.getLabbyanimalId(this.animalId).subscribe(
      (response) => {
        this.labResults = response; // Directly replace the array with the API response
        console.log('Lab Results Records:', this.labResults);
      },
      (error) => {
        console.error('Error fetching lab records', error);
      }
    );
  }

  fetchTestNormal(): void {
    this.apiService.getAll19().subscribe(
      (response: ZTestNormalRangeDtoIEnumerableApiResponse) => {
        // Extract the 'data' property from the response
        this.testNormal = response.data!; // Assuming 'data' contains the array of ZTestNormalRangeDto
        console.log('Test Records:', this.testNormal);
      },
      (error) => {
        console.error('Error fetching test records', error);
      }
    );
  }

  fetchVaccineTypes(): void {
    this.apiService.getAll21().subscribe(
      (response: ZZVaccineTypeDtoIEnumerableApiResponse) => {
        // Extract the 'data' property from the response
        this.vaccineTypes = response.data!; // Assuming 'data' contains the array of ZTestNormalRangeDto
        console.log('Test Records:', this.vaccineTypes);
      },
      (error) => {
        console.error('Error fetching test records', error);
      }
    );
  }

  getUnitOfMeasurement(labResultId: number): string {
    // Find the matching lab result in the labResults array
    const matchingLabResult = this.labResults.find(result => result.labResultId === labResultId);

    if (matchingLabResult) {
      // Extract testNormalRangeId from the lab result
      const testNormalRangeId = matchingLabResult.testNormalRangeId;

      // Find the matching test in the testNormal array
      const matchingTest = this.testNormal.find(test => test.testNormalRangeId === testNormalRangeId);

      // Return the unit of measurement or 'N/A' if no match is found
      return matchingTest ? matchingTest.unitOfMeasurement! : 'N/A';
    }

    // Return 'N/A' if no matching lab result is found
    return 'N/A';
  }



  getFullImageUrl(imagePath: string): string {
    const fullUrl = `https://localhost:7175/api/Animal/DownloadImageAnimal?imagePath=${encodeURIComponent(imagePath)}`;
    console.log('Generated image URL:', fullUrl); // Log the URL to check
    return fullUrl;
  }

  getFullImageXrayUrl(imagePath: string): string {
    const fullUrl = `https://localhost:7175/api/XrayImage/DownloadXrayImage?imagePath=${encodeURIComponent(imagePath)}`;
    console.log('Generated image URL:', fullUrl); // Log the URL to check
    return fullUrl;
  }

  xray: XrayImageDto[] = [];
  fetchXrayByAnimalId(): void {
    this.apiService.getXRayByAnimalId(this.animalId).subscribe(
      (xrays: XrayImageDto[]) => {
        // Ensure you're working with XrayImageDto instances
        this.xray = xrays.map(xray => {
          // Create a new instance of XrayImageDto if necessary
          const xrayInstance = new XrayImageDto();

          // Assign properties, including the transformed imageUrl
          Object.assign(xrayInstance, xray, {
            imageUrl: this.getFullImageXrayUrl(xray.imageUrl || "")
          });

          return xrayInstance;
        });

        console.log('Xray Records:', this.xray);
      },
      (error) => {
        console.error('Error fetching X-ray records', error);
      }
    );
  }

  newXray: XrayImageDto = new XrayImageDto(); // For storing X-ray metadata
  selectedXrayImage: File | null = null; // For storing the selected file

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.selectedXrayImage = input.files[0]; // Save the selected file
    }
  }

  onAddXray(event: Event): void {
    event.preventDefault();

    // Validate that a file has been selected
    if (!this.selectedXrayImage) {
      console.error('File is missing.');
      return;
    }

    // Create the FileParameter object
    const fileParameter: FileParameter = {
      data: this.selectedXrayImage, // Pass the selected file
      fileName: this.selectedXrayImage.name, // Pass the file name
    };

    // Get other required parameters
    const animalId = this.animal?.animalId; // Use the animal's ID
    const createdDate = new Date(); // Use the current date
    const imageUrl = ''; // This can be left blank for now; the backend can populate it
    const xrayId = 0; // Leave it undefined or 0 if the backend generates the ID

    // Call the API service
    this.apiService
      .addXraywithImage(xrayId, imageUrl, animalId, createdDate, fileParameter)
      .subscribe({
        next: (response) => {
          console.log('X-ray added successfully:', response);
          this.snackBar.open('Image added successfully!', 'Close', { duration: 3000 })
          // Refresh the X-ray list
          this.fetchXrayByAnimalId();
        },
        error: (error) => {
          console.error('Error adding X-ray:', error);
        },
      });
  }


  onDeleteXray(xrayId: number): void {
    if (confirm('Are you sure you want to delete this X-ray?')) {
      this.apiService.deleteById17(xrayId).subscribe({
        next: () => {
          console.log('X-ray deleted successfully.');
          // Remove the deleted X-ray from the list
          this.xray = this.xray.filter((x) => x.xrayId !== xrayId);
        },
        error: (error) => {
          console.error('Error deleting X-ray:', error);
        },
      });
    }
  }


  onAddLabResults(): void {
    this.dialog.open(AddLabComponent, {
      disableClose: true, // Prevent closing on outside click or Escape key
      width: '600px', // Optional: Adjust dialog width
      data: { animalId: this.animalId } // Pass animalId to the dialog
    });
  }

  onAddVaccine(): void {
    this.dialog.open(AddVaccineComponent, {
      disableClose: true, // Prevent closing on outside click or Escape key
      width: '600px', // Optional: Adjust dialog width
      data: { animalId: this.animalId } // Pass animalId to the dialog
    });
  }


  onDeleteMedical(row: any): void {
    // Open the dialog
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px', // Set the desired width here
      height: '200px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Proceed with deletion
        console.log('Delete action confirmed for:', row.diagnosis);
        this.apiService.deleteById10(row.medicalRecordId).subscribe({
          next: (response) => {
            console.log('Delete successful:', response);
            // Remove row from table
            this.removeRowFromTableMedical(row);
            this.snackBar.open('Record deleted successfully!', 'Close', { duration: 3000 })
          },
          error: (err) => {
            console.error('Error deleting record:', err);
            this.snackBar.open('Failed to delete record!', 'Close', { duration: 3000 })
          }
        });
      } else {
        console.log('Delete action cancelled');
      }
    });
  }

  removeRowFromTableMedical(row: any): void {
    const index = this.records.findIndex(item => item.medicalRecordId === row.medicalRecordId);
    if (index !== -1) {
      this.records.splice(index, 1);  // Remove the row from your data array
    }
  }

  onDeleteLabResults(row: any): void {
    // Open the dialog
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px', // Set the desired width here
      height: '200px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Proceed with deletion
        console.log('Delete action confirmed for:', row.testName);
        this.apiService.deleteById18(row.labResultId).subscribe({
          next: (response) => {
            console.log('Delete successful:', response);
            // Remove row from table
            this.removeRowFromTableLab(row);
            this.snackBar.open('Lab Result has been deleted successfully!', 'Close', { duration: 3000 })
          },
          error: (err) => {
            console.error('Error deleting record:', err);
            this.snackBar.open('Failed to delete Lab Result!', 'Close', { duration: 3000 })
          }
        });
      } else {
        console.log('Delete action cancelled');
      }
    });
  }

  removeRowFromTableLab(row: any): void {
    const index = this.labResults.findIndex(item => item.labResultId === row.labResultId);
    if (index !== -1) {
      this.records.splice(index, 1);  // Remove the row from your data array
    }
  }

  onDeleteVaccine(row: any): void {
    // Open the dialog
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px', // Set the desired width here
      height: '200px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Proceed with deletion
        console.log('Delete action confirmed for:', row.vaccineName);
        this.apiService.deleteById16(row.vaccinationId).subscribe({
          next: (response) => {
            console.log('Delete successful:', response);
            // Remove row from table
            this.removeRowFromTableVaccine(row);
            this.snackBar.open('Vaccine Result has been deleted successfully!', 'Close', { duration: 3000 })
          },
          error: (err) => {
            console.error('Error deleting record:', err);
            this.snackBar.open('Failed to delete Vaccine Result!', 'Close', { duration: 3000 })
          }
        });
      } else {
        console.log('Delete action cancelled');
      }
    });
  }

  removeRowFromTableVaccine(row: any): void {
    const index = this.vaccines.findIndex(item => item.vaccinationId === row.vaccinationId);
    if (index !== -1) {
      this.records.splice(index, 1);  // Remove the row from your data array
    }
  }



  openAddAppointmentDialog(animalId: number): void {
        const dialogRef = this.dialog.open(AddAppDialogComponent, {
          width: '700px',
          data: { animalId } // Pass the animalId to the dialog data
        });

        dialogRef.afterClosed().subscribe((result) => {
          console.log('Dialog closed:', result);
          // Optionally refresh the appointment list
          //this.getAppointments();
        });
      }

      getVaccineName(vaccinationId: number): string {
        // Find the matching vaccination in the vaccines array
        const matchingVaccination = this.vaccines.find(vaccination => vaccination.vaccinationId === vaccinationId);

        if (matchingVaccination) {
          // Extract vaccineTypeId from the vaccination
          const vaccineTypeId = matchingVaccination.vaccineTypeId;

          // Find the matching vaccine type in the vaccineTypes array
          const matchingVaccineType = this.vaccineTypes.find(vaccineType => vaccineType.vaccineTypeId === vaccineTypeId);

          // Return the vaccine name or 'N/A' if no match is found
          return matchingVaccineType ? matchingVaccineType.vaccineName! : 'N/A';
        }

        // Return 'N/A' if no matching vaccination is found
        return 'N/A';
    }

    getDose(vaccinationId: number): string {
      // Find the matching vaccination in the vaccines array
      const matchingVaccination = this.vaccines.find(vaccination => vaccination.vaccinationId === vaccinationId);

      if (matchingVaccination) {
        // Extract vaccineTypeId from the vaccination
        const vaccineTypeId = matchingVaccination.vaccineTypeId;

        // Find the matching vaccine type in the vaccineTypes array
        const matchingVaccineType = this.vaccineTypes.find(vaccineType => vaccineType.vaccineTypeId === vaccineTypeId);

        // Return the vaccine name or 'N/A' if no match is found
        return matchingVaccineType ? matchingVaccineType.dose! : 'N/A';
      }

      // Return 'N/A' if no matching vaccination is found
      return 'N/A';
  }

}

