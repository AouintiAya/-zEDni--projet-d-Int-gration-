import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './pages/accueil/contact/contact.component';
import { HomeComponent } from './pages/accueil/home/home.component';
import { ForgotPasswordComponent } from './pages/Authentification/forgot-password/forgot-password.component';
import { LoginComponent } from './pages/Authentification/login/login.component';
import { RegisterComponent } from './pages/Authentification/register/register.component';
import { DetailCoursComponent } from './pages/enseignant/course-details/course-details.component';
import { CourseExamsComponent } from './pages/enseignant/course-exams/course-exams.component';
import { CourseListComponent } from './pages/enseignant/course-list/course-list.component';
import { CreateCourseComponent } from './pages/enseignant/create-course/create-course.component';
import { TeacherDashboardComponent } from './pages/enseignant/dashboard-enseignant/dashboard-enseignant.component';
import { DashboardWelcomeComponent } from './pages/enseignant/dashboard-welcome/dashboard-welcome.component';
import { ProfilEnseignantComponent } from './pages/enseignant/profil-enseignant/profil-enseignant.component';
import { CoursDisponibleComponent } from './pages/Etudiant/cours-disponible/cours-disponible.component';
import { CourseDetailsComponent } from './pages/Etudiant/course-details/course-details.component';
import { DashboardEtudiantComponent } from './pages/Etudiant/dashboard-etudiant/dashboard-etudiant.component';
import { MesCoursComponent } from './pages/Etudiant/mescours/mescours.component';
import { PageCoursEtudiantComponent } from './pages/Etudiant/page-cours-etudiant/page-cours-etudiant.component';
import { ProfileComponent } from './pages/Etudiant/profileEtudiant/profile.component';

import { AddRessourceComponent } from './pages/enseignant/add-ressource/add-ressource.component';
import { CreateQuizComponent } from './pages/enseignant/create-quiz/create-quiz.component';
import { ExamListComponent } from './pages/enseignant/exam-list/exam-list.component';
import { ParticipationListComponent } from './pages/enseignant/participation-list/participation-list.component';
import { QuizListComponent } from './pages/enseignant/quiz-list/quiz-list.component';
import { RessourceDetailComponent } from './pages/enseignant/ressource-detail/ressource-detail.component';
import { RessourceListComponent } from './pages/enseignant/ressource-list/ressource-list.component';
import { ExamenListComponent } from './pages/Etudiant/examen-list/examen-list.component';
import { ListQuizComponent } from './pages/Etudiant/list-quiz/list-quiz.component';
import { RessourcesListEtudiantComponent } from './pages/Etudiant/ressources-list-etudiant/ressources-list-etudiant.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'dashboard-etudiant', component: DashboardEtudiantComponent },

  {
    path: 'dashboard-enseignant',
    component: TeacherDashboardComponent,
    children: [
      { path: 'cours/:id/examens', component: ExamListComponent },
      { path: 'cours/:id/ressources', component: RessourceListComponent },
      { path: '', component: DashboardWelcomeComponent },
      { path: 'create-course', component: CreateCourseComponent },
      { path: 'mes-cours', component: CourseListComponent },
      { path: 'profil-enseignant', component: ProfilEnseignantComponent },
      { path: 'detailCours/:id', component: DetailCoursComponent },
      { path: 'add-ressource/:id', component: AddRessourceComponent },
      { path: 'ressource/:id', component: RessourceDetailComponent },
      { path: 'create-quiz/:idCours', component: CreateQuizComponent },
      { path: 'quiz-list/:courseId', component: QuizListComponent },
      { path: 'quiz-list/participations/:quizId', component: ParticipationListComponent },

      // EXAMS
      { path: 'courseExam/:id', component: CourseExamsComponent }
    ]
  },

  { path: 'home', component: HomeComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'cours', component: PageCoursEtudiantComponent },
  { path: 'coursdisponible', component: CoursDisponibleComponent },
  { path: 'mescours', component: MesCoursComponent },
  { path: 'courses/:id', component: CourseDetailsComponent },
  {path: 'cours/:id/ressourcesEtudiant', component:RessourcesListEtudiantComponent},
  {path: 'cours/:id/ListQuizEtudiant', component:ListQuizComponent},
  {path: 'cours/:id/ExamenListEtudiant', component:ExamenListComponent}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
