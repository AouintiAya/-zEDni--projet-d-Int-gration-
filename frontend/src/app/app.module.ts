import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { DetailCoursComponent } from './pages/enseignant/course-details/course-details.component';
import { CreateCourseComponent } from './pages/enseignant/create-course/create-course.component';
import { CourseDetailsComponent } from './pages/Etudiant/course-details/course-details.component';
import { ProfilEnseignantComponent } from './pages/enseignant/profil-enseignant/profil-enseignant.component';
import { CoursDisponibleComponent } from './pages/Etudiant/cours-disponible/cours-disponible.component';
import { DashboardEtudiantComponent } from './pages/Etudiant/dashboard-etudiant/dashboard-etudiant.component';
import { MesCoursComponent } from './pages/Etudiant/mescours/mescours.component';
import { PageCoursEtudiantComponent } from './pages/Etudiant/page-cours-etudiant/page-cours-etudiant.component';
import { ProfileComponent } from './pages/Etudiant/profileEtudiant/profile.component';
import { QuizListComponent } from './pages/enseignant/quiz-list/quiz-list.component';
import { CreateQuizComponent } from './pages/enseignant/create-quiz/create-quiz.component';
import { ParticipationListComponent } from './pages/enseignant/participation-list/participation-list.component';
import { CourseExamsComponent } from './pages/enseignant/course-exams/course-exams.component';
import { AddRessourceComponent } from './pages/enseignant/add-ressource/add-ressource.component';

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
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
