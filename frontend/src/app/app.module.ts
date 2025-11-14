import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { ContactComponent } from './pages/contact/contact.component';
import { DashboardEtudiantComponent } from './pages/dashboard-etudiant/dashboard-etudiant.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
<<<<<<< HEAD
=======
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProfilEnseignantComponent } from './pages/profil-enseignant/profil-enseignant.component';
import { CoursEtudiantComponent } from './cours-etudiant/cours-etudiant.component';
>>>>>>> 097d282bf9c49c6c089c827a7590f7532ea9f7d5


@NgModule({
  declarations: [
    AppComponent,
    DashboardEtudiantComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ForgotPasswordComponent,
<<<<<<< HEAD
    ContactComponent
=======
    ProfileComponent,
    ProfilEnseignantComponent,
    CoursEtudiantComponent
>>>>>>> 097d282bf9c49c6c089c827a7590f7532ea9f7d5

  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,RouterModule
  ],
  providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
