import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AdoptionQuestionnaireDto, APIClient } from '@shared/services/api-client/veterinary-api.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { AuthService, TokenService } from '@core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-adoption-questionnaire',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    CommonModule,
    MatCheckboxModule,
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatSelectModule,
    MatInputModule,
    MatRadioModule,
],
  templateUrl: './adoption-questionnaire.component.html',
  styleUrls: ['./adoption-questionnaire.component.scss']
})
export class AdoptionQuestionnaireComponent implements OnInit {

  petForAdoptionId!: number;

  adoption: AdoptionQuestionnaireDto = new AdoptionQuestionnaireDto();

  constructor(private apiService: APIClient, private router: Router, private route: ActivatedRoute,
    private authService: AuthService, private tokenService: TokenService, private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.petForAdoptionId = +params['petForAdoptionId']; // Retrieve and store the ID
      // You can now use this.petForAdoptionId to fetch specific pet details from the backend
      console.log('petforadoptionId:', this.petForAdoptionId)
    });

    this.authService.getUser().subscribe(user => {
      console.log('Logged-in user:', user);
      this.adoption.userId = user.user_ID; // Dynamically set userId
    });
  }

  onSubmit() {
    // Debug: Log the adoption object before making the API call
  console.log('Adoption data before submission:', this.adoption);

  const userId = this.tokenService.getUserId(); // Ensure this retrieves the correct user ID

  if (!userId) {
    console.error('User is not logged in or user ID is not available.');
    return;
  }
  this.adoption.userId = userId;
  // Set default values
  this.adoption.adoptionQuestionnaireId = 0;
  this.adoption.petForAdoptionId = this.petForAdoptionId;
  this.adoption.questionStatus = 'Pending';
  this.adoption.createdAt = new Date();


  // Debug: Log updated adoption object
  console.log('Adoption data after setting defaults:', this.adoption);
    // Call backend service to add the questionnaire
    this.apiService.add(this.adoption).subscribe({
      next: (response) => {
        console.log('Response from backend:', response);
        this.snackBar.open('adoption questionnaire added successfully!', 'Close', {
          duration: 3000,
        });
          this.router.navigate(['pet-for-adoption']);
      },
      error: (err) => {
        console.error('Error adding adoption questionnaire:', err);
        alert('Failed to add adoption questionnaire!');
      },
    });
  }

  navigateTo(link: string): void {
    this.router.navigate([link]);
  }
    onSurgeryDetails() {
      // Navigate to the add pet route
      this.router.navigate(['surgery-home']); }

    onAdoptNow() {
      // Navigate to the add pet route
      this.router.navigate(['adoption-questionnaire']); }

      setMarriedStatus(status: boolean) {
        this.adoption.isMarried = status;
      }
}
