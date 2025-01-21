import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  NgZone,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { Router, RouterLink } from '@angular/router';
import { MtxProgressModule } from '@ng-matero/extensions/progress';
import { Subscription } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { AppSettings, SettingsService } from '@core';
import { DashboardService } from './dashboard.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { APIClient } from '@shared/services/api-client/veterinary-api.service';
import { Chart, registerables } from 'chart.js';
import { AddDollarPipe } from '@shared/pipes/add-dollar.pipe';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  providers: [DashboardService],
  standalone: true,
  imports: [
    NgxChartsModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatListModule,
    MatGridListModule,
    MatTableModule,
    MatTabsModule,
    MtxProgressModule,
    MatIconModule,
    AddDollarPipe
],
})
export class DashboardComponent implements OnInit {
  private readonly ngZone = inject(NgZone);
  private readonly settings = inject(SettingsService);
  private readonly dashboardSrv = inject(DashboardService);

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
                borderColor: 'rgba(43, 40, 235, 0.87)',
                backgroundColor: 'rgba(76, 102, 175, 0.26)',
                fill: true,
                tension: 0.4,  // Smooth line curve
                pointRadius: 3,  // Larger points
                pointBackgroundColor: '#fff', // White background for points
                pointBorderColor: 'rgba(43, 40, 235, 0.87)',  // Green border for points
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
  viewAdoptions() {
    this.router.navigate(['adoption'])
  }
  viewPets() {
    this.router.navigate(['pet'])
  }
  viewRatings() {
    this.router.navigate(['ratings'])
  }

  constructor(private apiService: APIClient, private router: Router){
    Chart.register(...registerables); // Register Chart.js components
  }

  ngOnInit(): void {
    this.totalAppointments();
    this.loadRevenueChart();
    this.loadPetCounts();
    this.loadHorseCounts();
    this.loadYearlyTotalRevenue();
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

  colorScheme = 'air'; // Use a predefined color scheme
  showContent = true;

  datas: ChartDat[] = []; // Initialize an empty array for the chart data
  horseCount: number = 0;
  petCount: number = 0;

  // Load Horse Patient Counts
  loadHorseCounts(): void {
    this.apiService.counttotalhorsepatients().subscribe({
      next: (response) => {
        console.log('count horses:', response);
        this.horseCount = response; // Store horse count in variable
        this.updateChartDat(); // Update datas array after receiving the count
      },
      error: (err) => {
        console.error('Error fetching horse patient count:', err);
      }
    });
  }

  // Load Pet Patient Counts
  loadPetCounts(): void {
    this.apiService.counttotalpetpatients().subscribe({
      next: (response) => {
        console.log('count pets:', response);
        this.petCount = response; // Store pet count in variable
        this.updateChartDat(); // Update datas array after receiving the count
      },
      error: (err) => {
        console.error('Error fetching pet patient count:', err);
      }
    });
  }

  // Update the datas array with the counts
  updateChartDat(): void {
    this.datas = [
      { name: 'Horses', value: this.horseCount },
      { name: 'Pets', value: this.petCount }
    ];
  }

  totalyearRevenue: number = 0;
  loadYearlyTotalRevenue(): void {
    this.apiService.yearlyTotalSumrevenue().subscribe({
      next: (response) => {
        console.log('Yearly Total Revenue:', response.totalRevenue);
        this.totalyearRevenue = response.totalRevenue;
      },
      error: (err) => {
        console.error('Error fetching yearly revenue:', err);
      }
    });
  }

}
interface ChartDat {
  name: string;
  value: number;
}
