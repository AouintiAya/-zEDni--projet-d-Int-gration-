import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContactComponent } from './pages/contact/contact.component';
import { TeacherDashboardComponent } from './pages/dashboard-enseignant/dashboard-enseignant.component';
import { DashboardEtudiantComponent } from './pages/dashboard-etudiant/dashboard-etudiant.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
<<<<<<< HEAD
=======
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ProfileComponent } from './pages/profile/profile.component';
>>>>>>> 097d282bf9c49c6c089c827a7590f7532ea9f7d5


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'dashboard-etudiant', component: DashboardEtudiantComponent },
  { path: 'dashboard-enseignant', component: TeacherDashboardComponent },
  { path: 'home', component: HomeComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
<<<<<<< HEAD
  { path: 'contact', component: ContactComponent },

=======
  { path: 'profile', component: ProfileComponent },
>>>>>>> 097d282bf9c49c6c089c827a7590f7532ea9f7d5
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
