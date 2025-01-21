import { Routes } from '@angular/router';
import { authGuard } from '@core';
import { AdminLayoutComponent } from '@theme/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from '@theme/auth-layout/auth-layout.component';
import { DashboardComponent } from './routes/dashboard/dashboard.component';
import { Error403Component } from './routes/sessions/403.component';
import { Error404Component } from './routes/sessions/404.component';
import { Error500Component } from './routes/sessions/500.component';
import { LoginComponent } from './routes/sessions/login/login.component';
import { RegisterComponent } from './routes/sessions/register/register.component';
import { InventoryComponent } from './routes/Inventory/inventory.component';
import { PetDetailComponent } from './routes/pet/pet-detail/pet-detail.component';
import { PetComponent } from './routes/pet/pet.component';
import { OverviewComponent } from './routes/overview/overview.component';
import { ClientHomeComponent } from './routes/client-home/client-home.component';
import { AddingPetComponent } from './routes/pet/adding-pet/adding-pet.component';
import { SurgeryHomeComponent } from './routes/client-home/surgery-home/surgery-home.component';
import { AddingMedicalComponent } from './routes/pet/adding-medical/adding-medical.component';
import { StaffComponent } from './routes/Staff/staff.component';
import { HorseComponent } from './routes/horse/horse.component';
import { AddHorseComponent } from './routes/horse/add-horse/add-horse.component';
import { AdoptionQuestionnaireComponent } from './routes/client-home/adoption-questionnaire/adoption-questionnaire.component';
import { BookAppComponent } from './routes/client-home/book-app/book-app.component';
import { PetForAdoptionComponent } from './routes/client-home/pet-for-adoption/pet-for-adoption.component';
import { DogTrainingHomeComponent } from './routes/client-home/dog-training-home/dog-training-home.component';
import { DentalCareHomeComponent } from './routes/client-home/dental-care-home/dental-care-home.component';
import { TeamHomeComponent } from './routes/client-home/team-home/team-home.component';
import { AdoptionDetailsComponent } from './routes/client-home/adoption-details/adoption-details.component';
import { VaccineDetailsComponent } from './routes/client-home/vaccine-details/vaccine-details.component';
import { GroomDetailsComponent } from './routes/client-home/groom-details/groom-details.component';
import { InternalMedicineComponent } from './routes/client-home/internal-medicine/internal-medicine.component';
import { AppointmentComponent } from './routes/appointment/appointment.component';
import { AdoptionComponent } from './routes/adoption/adoption.component';
import { InvoiceComponent } from './routes/Invoice/Invoice.component';
import { AddLabComponent } from './routes/pet/add-lab/add-lab.component';
import { DashRatingsComponent } from './routes/dash-ratings/dash-ratings.component';
import { LabResultHomeComponent } from './routes/client-home/lab-result-home/lab-result-home.component';


export const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    children: [
      { path: '', redirectTo: 'client-home', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: '403', component: Error403Component },
      { path: '404', component: Error404Component },
      { path: '500', component: Error500Component },
      { path: 'inventory', component: InventoryComponent },
      { path: 'staff', component: StaffComponent},
      { path: 'pet', component: PetComponent},
      { path: 'overview', component: OverviewComponent},
      { path: 'client-home', component: ClientHomeComponent},
      { path: 'pet-detail', component: PetDetailComponent }, // Detail route with a parameter
      { path: 'add-pet', component: AddingPetComponent },
      { path: 'surgery-home', component: SurgeryHomeComponent},
      { path: 'add-medical', component: AddingMedicalComponent},
      { path: 'pet-detail/:id', component: PetDetailComponent },
      { path: 'horse', component: HorseComponent},
      { path: 'add-horse', component: AddHorseComponent},
      { path: 'adoption-questionnaire', component: AdoptionQuestionnaireComponent},
      { path: 'book-appointment', component: BookAppComponent},
      { path: 'pet-for-adoption', component: PetForAdoptionComponent},
      { path: 'dog-training-home', component: DogTrainingHomeComponent},
      { path: 'dental-care-home', component: DentalCareHomeComponent},
      { path: 'team-home', component: TeamHomeComponent},
      { path: 'adoption-details', component: AdoptionDetailsComponent},
      { path: 'vaccine-details', component: VaccineDetailsComponent},
      { path: 'groom-details', component: GroomDetailsComponent},
      { path: 'internal-medicine', component: InternalMedicineComponent},
      { path: 'appointment', component: AppointmentComponent},
      { path: 'adoption', component: AdoptionComponent},
      { path: 'invoice', component: InvoiceComponent},
      { path: 'ratings', component: DashRatingsComponent},
      { path: 'lab-result-home', component: LabResultHomeComponent},


      {
        path: 'design',
        loadChildren: () => import('./routes/design/design.routes').then(m => m.routes),
      },
      {
        path: 'material',
        loadChildren: () => import('./routes/material/material.routes').then(m => m.routes),
      },
      {
        path: 'media',
        loadChildren: () => import('./routes/media/media.routes').then(m => m.routes),
      },
      {
        path: 'forms',
        loadChildren: () => import('./routes/forms/forms.routes').then(m => m.routes),
      },
      {
        path: 'tables',
        loadChildren: () => import('./routes/tables/tables.routes').then(m => m.routes),
      },
      {
        path: 'profile',
        loadChildren: () => import('./routes/profile/profile.routes').then(m => m.routes),
      },
      {
        path: 'permissions',
        loadChildren: () => import('./routes/permissions/permissions.routes').then(m => m.routes),
      },
      {
        path: 'utilities',
        loadChildren: () => import('./routes/utilities/utilities.routes').then(m => m.routes),
      },
    ],
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ],
  },
  { path: '**', redirectTo: 'dashboard' },
];
