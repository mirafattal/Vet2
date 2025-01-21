import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { TokenService } from '@core';
import { AnimalDto, APIClient, ZLabResultDto, ZTestNormalRangeDto, ZTestNormalRangeDtoIEnumerableApiResponse } from '@shared/services/api-client/veterinary-api.service';

@Component({
  selector: 'app-lab-result-home',
  standalone: true,
  imports: [
    MatTableModule,
    MatSelectModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './lab-result-home.component.html',
  styleUrls: ['./lab-result-home.component.scss']
})
export class LabResultHomeComponent implements OnInit {

  ownerId!: number;
  userId: number = 0;
  animals: AnimalDto [] = [];
  labResults: ZLabResultDto[] = [];
  testNormal: ZTestNormalRangeDto[] = [];

  constructor(private apiService: APIClient, private tokenService: TokenService) { }

  ngOnInit() {

    const userId = this.tokenService.getUserId();

  if (userId !== undefined && userId !== null) {
    this.userId = userId;
    this.getOwnerId(this.userId);
    console.log('this owner id', this.ownerId)
    console.log('this user id', this.userId)
  } else {
    console.log('User is not authenticated');  // Handle unauthenticated state (e.g., redirect to login page)
  }


  this.getAnimals(this.ownerId!);
  this.fetchLabResults();
  this.fetchTestNormal();
  }

  getOwnerId(userId: number): void {
    this.apiService.getOwnerIdByUserId(userId).subscribe({
      next: (ownerId) => {
        console.log('Fetched ownerId:', ownerId); // Log the actual ownerId here
        this.ownerId = ownerId;
        if (this.ownerId && this.ownerId > 0) {
          this.getAnimals(this.ownerId); // Proceed only if ownerId is valid
        } else {
          console.error('Invalid ownerId:', this.ownerId); // Handle invalid ownerId
        }
      },
      error: (err) => {
        console.error('Error fetching ownerId:', err);
      }
    });
  }


  getAnimals(ownerId: number): void {
    if (ownerId !== null && ownerId > 0) {
      this.apiService.getAllAnimalsByOwnerId(this.ownerId).subscribe({
        next: (animals) => {
          this.animals = animals;
          console.log('Fetched animals:', this.animals); // Log the animals
        },
        error: (err) => {
          console.error('Error fetching animals:', err);
        }
      });
    } else {
      console.error('Invalid ownerId passed to getAnimals:', this.ownerId); // Ensure valid ownerId before making the API call
    }
  }

  animalId = this.getAnimals(this.ownerId!);

  fetchLabResults(): void {
    this.apiService.getLabbyanimalId(this.animalId!).subscribe(
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

    selectedAnimalId: number = 0;
    displayedColumns: string[] = ['testName', 'testResult', 'unitOfMeasurement', 'Condition', 'testDate'];
    onAnimalSelect(): void {
      this.fetchLabResults();
    }
}
