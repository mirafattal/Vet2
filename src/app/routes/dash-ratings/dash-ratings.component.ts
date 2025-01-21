import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { APIClient, ZZratingDto } from '@shared/services/api-client/veterinary-api.service';

@Component({
  selector: 'app-dash-ratings',
  standalone: true,
  imports:[
    MatCardModule,
    CommonModule,
    MatIconModule,
    FormsModule,
  ],
  templateUrl: './dash-ratings.component.html',
  styleUrls: ['./dash-ratings.component.scss']
})
export class DashRatingsComponent implements OnInit {

  reviews: ZZratingDto[] = [];
  constructor(private apiService: APIClient) { }

  ngOnInit() {
    this.getReviews();
  }

  getReviews(): void {
    this.apiService.getAll20().subscribe({
      next: (response) => {
        if (response && response.data) {
          this.reviews = response.data; // Adjust this based on the actual response structure
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
