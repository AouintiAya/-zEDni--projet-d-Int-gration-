import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JwtInterceptor } from './interceptors/jwt.interceptor';



// Composants
import { ContactComponent } from './pages/accueil/contact/contact.component';
import { HomeComponent } from './pages/accueil/home/home.component';
import { ForgotPasswordComponent } from './pages/Authentification/forgot-password/forgot-password.component';
import { LoginComponent } from './pages/Authentification/login/login.component';
import { RegisterComponent } from './pages/Authentification/register/register.component';
import { AddRessourceComponent } from './pages/enseignant/add-ressource/add-ressource.component';
import { DetailCoursComponent } from './pages/enseignant/course-details/course-details.component';
import { CourseExamsComponent } from './pages/enseignant/course-exams/course-exams.component';
import { CreateCourseComponent } from './pages/enseignant/create-course/create-course.component';
import { CreateQuizComponent } from './pages/enseignant/create-quiz/create-quiz.component';
import { ExamListComponent } from './pages/enseignant/exam-list/exam-list.component';
import { ParticipationListComponent } from './pages/enseignant/participation-list/participation-list.component';
import { ProfilEnseignantComponent } from './pages/enseignant/profil-enseignant/profil-enseignant.component';
import { QuizListComponent } from './pages/enseignant/quiz-list/quiz-list.component';
import { RessourceDetailComponent } from './pages/enseignant/ressource-detail/ressource-detail.component';
import { RessourceListComponent } from './pages/enseignant/ressource-list/ressource-list.component';
import { CoursDisponibleComponent } from './pages/Etudiant/cours-disponible/cours-disponible.component';
import { CourseDetailsComponent } from './pages/Etudiant/course-details/course-details.component';
import { DashboardEtudiantComponent } from './pages/Etudiant/dashboard-etudiant/dashboard-etudiant.component';
import { ExamenListComponent } from './pages/Etudiant/examen-list/examen-list.component';
import { ListQuizComponent } from './pages/Etudiant/list-quiz/list-quiz.component';
import { MesCoursComponent } from './pages/Etudiant/mescours/mescours.component';
import { PageCoursEtudiantComponent } from './pages/Etudiant/page-cours-etudiant/page-cours-etudiant.component';
import { ProfileComponent } from './pages/Etudiant/profileEtudiant/profile.component';
import { RessourcesListEtudiantComponent } from './pages/Etudiant/ressources-list-etudiant/ressources-list-etudiant.component';
import { SafeUrlPipe } from './safe-url.pipe';

import { ListeEnseignantsComponent } from './pages/dashboard-admin/liste-enseignants/liste-enseignants.component';
import { ListeEtudiantsComponent } from './pages/dashboard-admin/liste-etudiants/liste-etudiants.component';
import { UsersComponent } from './pages/dashboard-admin/users/users.component';
import { AccueilEtudiantComponent } from './pages/Etudiant/accueil-etudiant/accueil-etudiant.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardEtudiantComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ForgotPasswordComponent,
    ContactComponent,
    ProfileComponent,
    ProfilEnseignantComponent,
    PageCoursEtudiantComponent,
    CoursDisponibleComponent,
    MesCoursComponent,
    CreateCourseComponent,
    CourseDetailsComponent,
    DetailCoursComponent,
    QuizListComponent,
    CreateQuizComponent,
    ParticipationListComponent,
    CourseExamsComponent,
    AddRessourceComponent,
    RessourceListComponent,
    RessourceDetailComponent,
    SafeUrlPipe,
    ExamListComponent,
    RessourcesListEtudiantComponent,
    ListQuizComponent,
    ExamenListComponent,
    AccueilEtudiantComponent,
    UsersComponent,
    ListeEtudiantsComponent,
    ListeEnseignantsComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    MatIconModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
