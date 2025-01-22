import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import {inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AddingPetComponent } from './adding-pet/adding-pet.component';
import { AnimalDto, AnimalSearchDto, APIClient, GetAnimalOwnerTable, OwnerDto, OwnerDtoIEnumerableApiResponse } from '@shared/services/api-client/veterinary-api.service';
import { DrawerPosition, MtxDrawer, MtxDrawerRef } from '@ng-matero/extensions/drawer';
import { PetDetailComponent } from './pet-detail/pet-detail.component';
import { AddAppDialogComponent } from './add-app-dialog/add-app-dialog.component';
import { AskUserDialogComponent } from './ask-user-dialog/ask-user-dialog.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pet',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    MatTableModule,
    RouterModule,
    MatIconModule
  ],
  templateUrl: './pet.component.html',
  styleUrl: './pet.component.scss'
})

export class PetComponent implements OnInit {

    animals: AnimalDto[] = [];
    owners: OwnerDto[] = [];
    displayedColumns = ['OwnerName', 'AnimalName', 'Species', 'Breed', 'actions', 'addAppointment'];
    dataSource = new MatTableDataSource<any>([]); // Initialize with an empty array
    animalId: number | null = null;
    animalTypeId = 1;
    searchTerm: string = '';

    position: DrawerPosition = 'right';
    width = '900px';
    height = '300px';
    hasBackdrop = true;
    disableClose = false;
    closeOnNavigation = true;

    constructor(private apiService: APIClient, private router: Router, private snackBar: MatSnackBar,
      private route: ActivatedRoute, private drawer: MtxDrawer) {}

      open(animalId: number) {
        console.log('Opening drawer for Animal ID:', animalId);
        const drawerRef = this.drawer.open(PetDetailComponent, {
          position: this.position,
          width: this.width,
          height: this.height,
          hasBackdrop: this.hasBackdrop,
          disableClose: this.disableClose,
          closeOnNavigation: this.closeOnNavigation,
          data: {animalId},
        });

        drawerRef.afterDismissed().subscribe(result => {
          console.log('The drawer was dismissed');
        });
      }

    ngOnInit(): void {
      this.dataSource.filterPredicate = (data: any, filter: string) => {
        const filterValue = filter.trim().toLowerCase();
        return (
          data.animalName.toLowerCase().includes(filterValue) ||
          data.fullName.toLowerCase().includes(filterValue)
        );
      };

      this.route.paramMap.subscribe((params) => {
        const idParam = params.get('id');
        console.log('Route param (id):', idParam);
        this.animalId = idParam ? +idParam : 0;
        console.log('Animal ID:', this.animalId);

        // Fetch data after the animalId is set
        this.fetchData(this.animalTypeId);
      });
    }
    fetchData(animalTypeId: number, searchTerm: string = ''): void {
      if (searchTerm) {
        // Ensure the owners are fetched as well
        this.apiService.searchAnimalOwner(searchTerm).subscribe((results) => {
          this.updateDataSource(results);
        });
      } else {
        // Default fetch without search term
        this.apiService.getAnimalOwnerTable().subscribe(
          (data: GetAnimalOwnerTable[]) => {
            // Map the data from the backend to match the format expected by your table
            const formattedData = data.map((item) => ({
              animalId: item.animalId,
              animalName: item.animalName,
              species: item.species,
              breed: item.breed,
              fullName: item.fullName || 'Unknown', // Ensure a fallback if fullName is null
              ownerId: item.ownerId,
            }));

            this.updateDataSource(formattedData);
          },
          (error) => {
            console.error('Error fetching data:', error);
            this.snackBar.open('Error fetching data', 'Close', { duration: 3000 });
          }
        );
      }
    }

    applySearch(searchTerm: string): void {
      if (searchTerm) {
        this.apiService.getAnimalOwnerTable().subscribe(
          (data: AnimalSearchDto[]) => {
            // Filter animals based on the search term
            const filteredData = data.filter((item) =>
              item.animalName!.toLowerCase().includes(searchTerm.toLowerCase()) ||
              item.breed!.toLowerCase().includes(searchTerm.toLowerCase())
            );

            // Map the filtered data to match the table structure
            const updatedData = filteredData.map((item) => ({
              animalId: item.animalId,
              animalName: item.animalName,
              breed: item.breed,
              fullName: item.fullName || 'Unknown', // Include owner name for reference
              ownerId: item.ownerId,
            }));

            // Update the dataSource with the filtered data
            this.updateDataSource(updatedData);
          },
          (error) => {
            console.error('Error fetching data:', error);
            this.snackBar.open('Error fetching data', 'Close', { duration: 3000 });
          }
        );
      } else {
        // If no search term is provided, reload the full data
        this.fetchData(this.animalTypeId);
      }
    }



    private updateDataSource(data: any[]): void {
      this.dataSource.data = data;
    }

    onEdit(row: any): void {
      console.log('Edit action clicked for:', row);
      // Add logic to edit details
    }

    onDelete(row: any): void {

      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '400px', // Set the desired width here
            height: '200px'
          });

          dialogRef.afterClosed().subscribe(result => {
            if (result) {
      // Call the backend service to delete the owner and animal
      this.apiService.deleteownerwithanimal(row.ownerId).subscribe({
        next: (response) => {
          console.log('Delete successful:', response);
          // Update the UI (remove the row from the table, etc.)
          this.removeRowFromTable(row);
          this.snackBar.open('Owner and associated Animal has been deleted successfully!', 'Close', { duration: 3000 })
        },
        error: (err) => {
          console.error('Error deleting owner and animal:', err);
          alert('Failed to delete owner and animal!');
        }
      }); }})
    }

    removeRowFromTable(row: any): void {
      // Implement logic to remove the deleted row from your displayed data
      const index = this.owners.findIndex(item => item.ownerId === row.ownerId);
      if (index !== -1) {
        this.owners.splice(index, 1);  // Remove the row from your data array
      }
    }

    readonly dialog = inject(MatDialog);
    openDialog() {
      this.dialog.open(AskUserDialogComponent, {
        disableClose: true, // Prevents closing on outside click or Escape key
      });
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

}

