import { Routes, RouterModule } from '@angular/router';
import { GroomDetailsComponent } from './groom-details/groom-details.component';
import { InternalMedicineComponent } from './internal-medicine/internal-medicine.component';
import { DogTrainingHomeComponent } from './dog-training-home/dog-training-home.component';
import { DentalCareHomeComponent } from './dental-care-home/dental-care-home.component';

export const routes: Routes = [
{ path: 'groom-details', component: GroomDetailsComponent},
{ path: 'internal-medicine', component: InternalMedicineComponent},
{ path: 'dog-training-home', component: DogTrainingHomeComponent},
{ path: 'dental-care-home', component: DentalCareHomeComponent},
];
