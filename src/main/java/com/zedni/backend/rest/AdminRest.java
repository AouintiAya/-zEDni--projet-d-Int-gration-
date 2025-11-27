package com.zedni.backend.rest;
import com.zedni.backend.dto.Cours.CoursDTO;
import com.zedni.backend.dto.DashboardDTO;
import com.zedni.backend.dto.Examen.ExamenDTO;
import com.zedni.backend.dto.Person.EnseignantDTO;
import com.zedni.backend.dto.Person.EtudiantDTO;
import com.zedni.backend.dto.Quiz.QuizResponseDTO;
import com.zedni.backend.dto.Ressource.RessourceCreateRequest;
import com.zedni.backend.dto.Ressource.RessourceDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/admin")
public interface AdminRest {
    @GetMapping("/enseignants_attente")
    //@PreAuthorize("hasAuthority('ROLE_ADMIN')")
    ResponseEntity<List<EnseignantDTO>> getEnseignantAttende();

    @GetMapping("/enseignants_actif")
    //@PreAuthorize("hasAuthority('ROLE_ADMIN')")
    ResponseEntity<List<EnseignantDTO>> getEnseignantActif();

    @PutMapping("/enseignants/{id}/toggle")
    //@PreAuthorize("hasAuthority('ROLE_ADMIN')")
    ResponseEntity<Void> toggleEnable(@PathVariable Long id);

    @GetMapping("/etudiants_attente")
    //@PreAuthorize("hasAuthority('ROLE_ADMIN')")
    ResponseEntity<List<EtudiantDTO>> getEtudiantsAttente();

    @GetMapping("/etudiants_actif")
    //@PreAuthorize("hasAuthority('ROLE_ADMIN')")
    ResponseEntity<List<EtudiantDTO>> getEtudiantsActifs();

    @PutMapping("/etudiants/{id}/toggle")
    //@PreAuthorize("hasAuthority('ROLE_ADMIN')")
    ResponseEntity<Void> toggleEtudiant(Long id);

    @PutMapping("/cours/{id}/valider")
    public ResponseEntity<?> validerCours(@PathVariable Long id);

    @PutMapping("/cours/{id}/rejeter")
    public ResponseEntity<?> rejeterCours(@PathVariable Long id);

    @GetMapping("/cours/en-attente")
    public ResponseEntity<List<CoursDTO>> getCoursEnAttente();

    @GetMapping("/examens/en-attente")
    public ResponseEntity<List<ExamenDTO>> getExamensEnAttente();

    @PutMapping("/examens/{id}/valider")
    public ResponseEntity<String> validerExamen(@PathVariable Long id);

    @PutMapping("/examens/{id}/rejeter")
    public ResponseEntity<String> rejeterExamen(@PathVariable Long id);
    @GetMapping("/quizzes/en-attente")
    public ResponseEntity<List<QuizResponseDTO>> getQuizzesEnAttente();

    @PutMapping("/quizzes/{id}/valider")
    public ResponseEntity<String> validerQuiz(@PathVariable Long id);

    @PutMapping("/quizzes/{id}/rejeter")
    public ResponseEntity<String> rejeterQuiz(@PathVariable Long id);

    @GetMapping("/dashboard")
    public DashboardDTO getDashboard();
}
