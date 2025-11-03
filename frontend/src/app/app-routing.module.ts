import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardEtudiantComponent } from './pages/dashboard-etudiant/dashboard-etudiant.component';
import { TeacherDashboardComponent } from './pages/dashboard-enseignant/dashboard-enseignant.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'dashboard-etudiant', component: DashboardEtudiantComponent },
  { path: 'dashboard-enseignant', component: TeacherDashboardComponent },
  { path: 'home', component: HomeComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
