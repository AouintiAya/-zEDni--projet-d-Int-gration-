import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardWelcomeComponent } from './pages/enseignant/dashboard-welcome/dashboard-welcome.component';
import { CreateCourseComponent } from './pages/enseignant/create-course/create-course.component';
import { CourseListComponent } from './pages/enseignant/course-list/course-list.component';
import { ContactComponent } from './pages/accueil/contact/contact.component';
import { TeacherDashboardComponent } from './pages/enseignant/dashboard-enseignant/dashboard-enseignant.component';
import { DashboardEtudiantComponent } from './pages/Etudiant/dashboard-etudiant/dashboard-etudiant.component';
import { ForgotPasswordComponent } from './pages/Authentification/forgot-password/forgot-password.component';
import { HomeComponent } from './pages/accueil/home/home.component';
import { LoginComponent } from './pages/Authentification/login/login.component';
import { RegisterComponent } from './pages/Authentification/register/register.component';
import { ProfileComponent } from './pages/Etudiant/profileEtudiant/profile.component';
import { PageCoursEtudiantComponent } from './pages/Etudiant/page-cours-etudiant/page-cours-etudiant.component';
import { CoursDisponibleComponent } from './pages/Etudiant/cours-disponible/cours-disponible.component';
import { MesCoursComponent } from './pages/Etudiant/mescours/mescours.component';
import { ProfilEnseignantComponent } from './pages/enseignant/profil-enseignant/profil-enseignant.component';

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
      { path: 'profil-enseignant', component: ProfilEnseignantComponent },

      
    ]
   },
  { path: 'home', component: HomeComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'cours', component: PageCoursEtudiantComponent },
  { path: 'coursdisponible', component: CoursDisponibleComponent },
  { path: 'mescours', component: MesCoursComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
