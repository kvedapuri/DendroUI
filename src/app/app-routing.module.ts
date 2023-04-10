import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { ContactusComponent } from './contactus/contactus.component';
import { PlantDetailsComponent } from './components/plant-details/plant-details.component';
import { PlantsListComponent } from './components/plants-list/plants-list.component';
import { AddPlantComponent } from './components/add-plant/add-plant.component';

import { AuthGuard } from './_helpers/auth.guard';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { AboutusComponent } from './aboutus/aboutus.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'forgotPassword', component: ForgotPasswordComponent },
  { path: 'contactus', component: ContactusComponent },
  { path: 'aboutus', component: AboutusComponent },
  { path: 'plants', component: PlantsListComponent, canActivate: [AuthGuard] },
  { path: 'plants/:id', component: PlantDetailsComponent, canActivate: [AuthGuard] },
  { path: 'add', component: AddPlantComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'aboutus', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }