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
import { DashboardEtudiantComponent } from './pages/Etudiant/dashboard-etudiant/dashboard-etudiant.component';
import { ForgotPasswordComponent } from './pages/Authentification/forgot-password/forgot-password.component';
import { HomeComponent } from './pages/accueil/home/home.component';
import { LoginComponent } from './pages/Authentification/login/login.component';
import { RegisterComponent } from './pages/Authentification/register/register.component';
import { ProfileComponent } from './pages/Etudiant/profileEtudiant/profile.component';
import { ProfilEnseignantComponent } from './pages/enseignant/profil-enseignant/profil-enseignant.component';
import { PageCoursEtudiantComponent } from './pages/Etudiant/page-cours-etudiant/page-cours-etudiant.component';
import { CoursDisponibleComponent } from './pages/Etudiant/cours-disponible/cours-disponible.component';
import { MesCoursComponent } from './pages/Etudiant/mescours/mescours.component';
import { CreateCourseComponent } from './pages/enseignant/create-course/create-course.component';

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
export class AppModule { }
