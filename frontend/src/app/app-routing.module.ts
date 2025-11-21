import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* ==================== AUTHENTIFICATION ==================== */
import { LoginComponent } from './pages/Authentification/login/login.component';
import { RegisterComponent } from './pages/Authentification/register/register.component';
import { ForgotPasswordComponent } from './pages/Authentification/forgot-password/forgot-password.component';

/* ==================== ACCUEIL ==================== */
import { HomeComponent } from './pages/accueil/home/home.component';
import { ContactComponent } from './pages/accueil/contact/contact.component';

/* ==================== ENSEIGNANT ==================== */
import { TeacherDashboardComponent } from './pages/enseignant/dashboard-enseignant/dashboard-enseignant.component';
import { DashboardWelcomeComponent } from './pages/enseignant/dashboard-welcome/dashboard-welcome.component';
import { CourseListComponent } from './pages/enseignant/course-list/course-list.component';
import { CreateCourseComponent } from './pages/enseignant/create-course/create-course.component';
import { DetailCoursComponent } from './pages/enseignant/course-details/course-details.component';
import { AddRessourceComponent } from './pages/enseignant/add-ressource/add-ressource.component';
import { RessourceDetailComponent } from './pages/enseignant/ressource-detail/ressource-detail.component';
import { RessourceListComponent } from './pages/enseignant/ressource-list/ressource-list.component';
import { CreateQuizComponent } from './pages/enseignant/create-quiz/create-quiz.component';
import { QuizListComponent } from './pages/enseignant/quiz-list/quiz-list.component';
import { ParticipationListComponent } from './pages/enseignant/participation-list/participation-list.component';
import { CourseExamsComponent } from './pages/enseignant/course-exams/course-exams.component';
import { ExamListComponent } from './pages/enseignant/exam-list/exam-list.component';
import { ProfilEnseignantComponent } from './pages/enseignant/profil-enseignant/profil-enseignant.component';

/* ==================== ETUDIANT ==================== */
import { DashboardEtudiantComponent } from './pages/Etudiant/dashboard-etudiant/dashboard-etudiant.component';
import { AccueilEtudiantComponent } from './pages/Etudiant/accueil-etudiant/accueil-etudiant.component';
import { CoursDisponibleComponent } from './pages/Etudiant/cours-disponible/cours-disponible.component';
import { CourseDetailsComponent } from './pages/Etudiant/course-details/course-details.component';
import { MesCoursComponent } from './pages/Etudiant/mescours/mescours.component';
import { ProfileComponent } from './pages/Etudiant/profileEtudiant/profile.component';
import { PageCoursEtudiantComponent } from './pages/Etudiant/page-cours-etudiant/page-cours-etudiant.component';
import { ListQuizComponent } from './pages/Etudiant/list-quiz/list-quiz.component';
import { ExamenListComponent } from './pages/Etudiant/examen-list/examen-list.component';
import { RessourcesListEtudiantComponent } from './pages/Etudiant/ressources-list-etudiant/ressources-list-etudiant.component';

/* ==================== ADMIN ==================== */

import { AdminDashboardComponent } from './pages/dashboard-admin/admin-dashboard/admin-dashboard.component';
import { AdminHomeComponent } from './pages/dashboard-admin/admin-home/admin-home.component';


const routes: Routes = [

  /* ==================== REDIRECT ==================== */
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  /* ==================== AUTH ==================== */
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },

  /* ==================== ACCUEIL ==================== */
  { path: 'home', component: HomeComponent },
  { path: 'contact', component: ContactComponent },

  /* ==================== DASHBOARD ADMIN ==================== */
  {
    path: 'dashboard-admin',
    component: AdminDashboardComponent,
    children: [
      { path: '', component: AdminHomeComponent },
      
    ]
  },

  /* ==================== DASHBOARD ENSEIGNANT ==================== */
  {
    path: 'dashboard-enseignant',
    component: TeacherDashboardComponent,
    children: [
      { path: '', component: DashboardWelcomeComponent },

      { path: 'mes-cours', component: CourseListComponent },
      { path: 'create-course', component: CreateCourseComponent },
      { path: 'profil-enseignant', component: ProfilEnseignantComponent },

      { path: 'detailCours/:id', component: DetailCoursComponent },

      { path: 'add-ressource/:id', component: AddRessourceComponent },
      { path: 'cours/:id/ressources', component: RessourceListComponent },
      { path: 'ressource/:id', component: RessourceDetailComponent },

      { path: 'create-quiz/:idCours', component: CreateQuizComponent },
      { path: 'quiz-list/:courseId', component: QuizListComponent },
      { path: 'quiz-list/participations/:quizId', component: ParticipationListComponent },

      { path: 'courseExam/:id', component: CourseExamsComponent },
      { path: 'cours/:id/examens', component: ExamListComponent },
    ]
  },
  


 /* ==================== DASHBOARD ETUDIANT ==================== */
{
  path: 'dashboard-etudiant',
  component: DashboardEtudiantComponent,
  children: [
    { path: '', component: AccueilEtudiantComponent }, // page par défaut
    { path: 'cours', component: PageCoursEtudiantComponent },
    { path: 'coursdisponible', component: CoursDisponibleComponent },
    { path: 'courses/:id', component: CourseDetailsComponent },
    { path: 'mescours', component: MesCoursComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'cours/:id/ressourcesEtudiant', component: RessourcesListEtudiantComponent },
    { path: 'cours/:id/ListQuizEtudiant', component: ListQuizComponent },
    { path: 'cours/:id/ExamenListEtudiant', component: ExamenListComponent },
  ]
},



  /* ==================== WILDCARD ==================== */
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
