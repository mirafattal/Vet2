import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { APIClient } from '@shared/services/api-client/veterinary-api.service';
import { ChartOptions, ChartType, ChartData, Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatTableModule
  ],

  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent {

  upcomingAppointments = 5;
  petPatients = [
    { name: 'Buddy', age: 3, health: 'Good', lastVisit: '2024-12-15' },
    { name: 'Mittens', age: 5, health: 'Excellent', lastVisit: '2024-12-10' },
    { name: 'Max', age: 2, health: 'Fair', lastVisit: '2024-11-20' },
  ];
  displayedColumns = ['name', 'age', 'health', 'lastVisit'];

  loadRevenueChart() {
    this.apiService.revenuemonthlybyday().subscribe((data: any) => {
      console.log('Data retrieved:', data);  // Log the data

      const canvas = document.getElementById('revenueChart') as HTMLCanvasElement;
      const ctx = canvas.getContext('2d');

      if (ctx) {
        new Chart(ctx, {
          type: 'line',
          data: {
            labels: data.map((item: any) => item.day),
            datasets: [
              {
                label: 'Revenue',
                data: data.map((item: any) => item.amount),
                borderColor: 'rgba(235, 40, 235, 0.87)',
                backgroundColor: 'rgba(175, 76, 175, 0.26)',
                fill: true,
                tension: 0.4,  // Smooth line curve
                pointRadius: 3,  // Larger points
                pointBackgroundColor: '#fff', // White background for points
                pointBorderColor: 'rgba(235, 40, 235, 0.87)',  // Green border for points
                pointBorderWidth: 1,  // Thicker point borders
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                display: true,
                position: 'top',
                labels: {
                  font: { family: "'Roboto', sans-serif", size: 14 },
                  color: '#333',
                },
              },
              tooltip: {
                backgroundColor: '#333',
                titleColor: '#fff',
                bodyColor: '#fff',
                borderColor: '#4caf50',
                borderWidth: 1,
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Day',
                  color: '#333',
                  font: { family: "'Roboto', sans-serif", size: 14 },
                },
                ticks: {
                  autoSkip: true,
                  maxRotation: 45,
                  minRotation: 45,
                  color: '#333',
                },
              },
              y: {
                title: {
                  display: true,
                  text: 'Revenue ($)',
                  color: '#333',
                  font: { family: "'Roboto', sans-serif", size: 14 },
                },
                ticks: {
                  //min: 0,  // Set minimum value for y-axis to 0
                  color: '#333',
                  font: { family: "'Roboto', sans-serif", size: 12 },
                },
              },
            },
            elements: {
              line: {
                borderWidth: 3,  // Thicker line for better visibility
              },
            },
          },
        });
      } else {
        console.error('Failed to get canvas context');
      }
    });
  }




  viewAppointments() {
    this.router.navigate(['appointment'])
  }


    longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;
  constructor(private apiService: APIClient, private router: Router){
    Chart.register(...registerables); // Register Chart.js components
  }

  ngOnInit(): void {
    this.totalAppointments();
    this.loadRevenueChart();
  }

  appoints: number = 0 ;


  totalAppointments() {
    this.apiService.countTotalAppointmentssofar().subscribe({
      next: (response: number) => {
        console.log('Total appointments so far:', response);
        this.appoints = response; // Store the count in a variable (optional)
      },
      error: (error) => {
        console.error('Error fetching total appointments:', error);
      }
    });
  }

}
