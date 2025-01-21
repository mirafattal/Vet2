import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-toolbar',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule
  ],
  templateUrl: './client-toolbar.component.html',
  styleUrls: ['./client-toolbar.component.scss']
})
export class ClientToolbarComponent implements OnInit {

  onSurgeryDetails() {
    // Navigate to the add pet route
    this.router.navigate(['surgery-home']); }

  onAdoptNow() {
    // Navigate to the add pet route
    this.router.navigate(['pet-for-adoption']); }

  onDogTraining() {
    // Navigate to the add pet route
    this.router.navigate(['dog-training-home']); }

  onDentalCare() {
    // Navigate to the add pet route
    this.router.navigate(['dental-care-home']); }

  gotoOurTeam() {
    // Navigate to the add pet route
    this.router.navigate(['team-home']); }

  onAdoptionDetails() {
    // Navigate to the add pet route
    this.router.navigate(['adoption-details']); }

  onVaccineDetails() {
    // Navigate to the add pet route
    this.router.navigate(['vaccine-details']); }

  onGroomDetails() {
    // Navigate to the add pet route
    this.router.navigate(['groom-details']); }

    onInternalMedicine(){
      this.router.navigate(['internal-medicine']);
    }

  constructor(private router: Router) { }

  ngOnInit() {
  }


  isLoggedIn: boolean = false; // Track if user is logged in

  // Method to handle notification click
  onNotificationClick() {
    console.log('Notification clicked');
    // You can implement your notification logic here
    // E.g., open a dialog or navigate to a notifications page
  }

  onLabResultHome() {
    this.router.navigate(['lab-result-home']);
  }

}
