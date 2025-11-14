import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContactComponent } from './pages/contact/contact.component';
import { TeacherDashboardComponent } from './pages/dashboard-enseignant/dashboard-enseignant.component';
import { DashboardEtudiantComponent } from './pages/dashboard-etudiant/dashboard-etudiant.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardWelcomeComponent } from './pages/dashboard-welcome/dashboard-welcome.component';
import { CreateCourseComponent } from './pages/create-course/create-course.component';
import { CourseListComponent } from './pages/course-list/course-list.component';
import { ProfileComponent } from './pages/profile/profile.component';




const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'dashboard-etudiant', component: DashboardEtudiantComponent },
  { path: 'dashboard-enseignant', component: TeacherDashboardComponent,
    children: [
      { path: '', component: DashboardWelcomeComponent }, // page par défaut
      { path: 'create-course', component: CreateCourseComponent },
      { path: 'mes-cours', component: CourseListComponent },
      { path: 'profil', component: ProfileComponent },
    ]
   },
  { path: 'home', component: HomeComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'profile', component: ProfileComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
