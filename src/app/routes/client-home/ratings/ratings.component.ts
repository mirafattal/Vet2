import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TokenService } from '@core';
import { APIClient, ZZratingDto } from '@shared/services/api-client/veterinary-api.service';

@Component({
  selector: 'app-ratings',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.scss']
})
export class RatingsComponent implements OnInit {

  constructor(private apiService: APIClient, private snackBar: MatSnackBar,
    private tokenService: TokenService
  ) { }

  ngOnInit() {
    this.getLastReviews();
    this.getStarArray(this.AddRating.ratingValue!);
  }

  setRating(rating: number) {
    // Logic to set the selected rating
    console.log(`Rating selected: ${rating}`);
  }

  stars = [1, 2, 3, 4, 5]; // Represents 5 stars
  rating = 0; // Current selected rating
  hoverRating = 0; // Temporarily highlighted rating during hover
  AddRating: ZZratingDto = new ZZratingDto();
  reviews: ZZratingDto[] = [];

  // Set the selected rating
  selectRating(star: number): void {
    this.rating = star;
    this.AddRating.ratingValue = star; // Update the total rating
  }

  // Highlight stars on hover
  highlightStars(star: number): void {
    this.hoverRating = star;
  }

  // Clear the highlight on mouse leave
  clearHighlight(): void {
    this.hoverRating = 0;
  }

  onSubmitReview(): void {
    const userId = this.tokenService.getUserId(); // Ensure this retrieves the correct user ID

  if (!userId) {
    console.error('User is not logged in or user ID is not available.');
    return;
  }
    this.AddRating.userId = userId;
    this.AddRating.ratingId = 0;
    this.AddRating.createdAt = new Date();
    this.AddRating.ratingValue = this.rating;
    console.log('User Id:', userId)
    if (this.validateForm()) {
      // Call the backend API to submit the review
      this.apiService.add20(this.AddRating).subscribe({
        next: (response) => {
          this.snackBar.open('Review submitted successfully!', 'Close', {
            duration: 3000,
          });
          this.resetForm();
        },
        error: (error) => {
          console.error('Error submitting review:', error);
          this.snackBar.open('Failed to submit the review. Try again.', 'Close', {
            duration: 3000,
          });
        },
      });
    }
  }

  validateForm(): boolean {
    if (
      !this.AddRating.fullName ||
      !this.AddRating.reviewTitle||
      !this.AddRating.review ||
      !this.AddRating.ratingValue ||
      this.rating === 0
    ) {
      this.snackBar.open('Please fill in all required fields and select a rating.', 'Close', {
        duration: 3000,
      });
      return false;
    }
    return true;
  }

  resetForm(): void {
    // Reset reviewData fields
    this.AddRating = new ZZratingDto;
    this.rating = 0;
  }



  getLastReviews(): void {
    this.apiService.latestReviews().subscribe({
      next: (response) => {
        if (response) {
          this.reviews = response; // Adjust this based on the actual response structure
        } else {
          console.error('Unexpected response format:', response);
        }
      },
      error: (err) => {
        console.error('Error fetching reviews:', err);
      }
    });
  }

  getStarArray(ratingValue: number): number[] {
    return Array(5).fill(0).map((_, i) => (i < ratingValue ? 1 : 0));
  }
}
