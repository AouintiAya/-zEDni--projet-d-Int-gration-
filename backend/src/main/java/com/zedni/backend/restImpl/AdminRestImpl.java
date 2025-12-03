package com.zedni.backend.restImpl;
import com.zedni.backend.dto.Cours.CoursDTO;
import com.zedni.backend.dto.DashboardDTO;
import com.zedni.backend.dto.Examen.ExamenDTO;
import com.zedni.backend.dto.Person.EnseignantDTO;
import com.zedni.backend.dto.Person.EtudiantDTO;
import com.zedni.backend.dto.Quiz.QuizResponseDTO;
import com.zedni.backend.model.CoursStatus;
import com.zedni.backend.rest.AdminRest;
import com.zedni.backend.service.AdminService;
import com.zedni.backend.service.CoursService;
import com.zedni.backend.service.ExamenService;
import com.zedni.backend.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class AdminRestImpl implements AdminRest {
    @Autowired
    private AdminService adminService;

    @Autowired
    private CoursService coursService;

    @Autowired
    private QuizService quizService;

    @Autowired
    private ExamenService examenService;

    @Override
    public ResponseEntity<List<EnseignantDTO>> getEnseignantAttende() {
        List<EnseignantDTO> list= adminService.getEnseignantAttende();
        return ResponseEntity.ok(list);
    }

    @Override
    public ResponseEntity<List<EnseignantDTO>> getEnseignantActif() {
        List<EnseignantDTO> list= adminService.getEnseignantActif();
        return ResponseEntity.ok(list);
    }

    @Override
    public ResponseEntity<Void> toggleEnable(Long id) {
        adminService.toggleEnableEnseignant(id);
        return ResponseEntity.ok().build();
    }

    @Override
    public ResponseEntity<List<EtudiantDTO>> getEtudiantsAttente() {
        return ResponseEntity.ok(adminService.getEtudiantsAttente());
    }

    @Override
    public ResponseEntity<List<EtudiantDTO>> getEtudiantsActifs() {
        return ResponseEntity.ok(adminService.getEtudiantsActifs());
    }

    @Override
    public ResponseEntity<Void> toggleEtudiant(Long id) {
        adminService.toggleEnableEtudiant(id);
        return ResponseEntity.ok().build();
    }

    @Override
    public ResponseEntity<?> validerCours(Long id) {
        coursService.updateCoursStatus(id, CoursStatus.VALIDE);
        return ResponseEntity.ok("Cours validé");
    }

    @Override
    public ResponseEntity<?> rejeterCours(Long id) {
        coursService.updateCoursStatus(id, CoursStatus.REJETE);
        return ResponseEntity.ok("Cours rejeté");
    }

    @Override
    public ResponseEntity<List<CoursDTO>> getCoursEnAttente() {
        List<CoursDTO> coursEnAttente = coursService.getCoursEnAttente();
        return ResponseEntity.ok(coursEnAttente);
    }

    @Override
    public ResponseEntity<List<ExamenDTO>> getExamensEnAttente() {
        return ResponseEntity.ok(examenService.getExamensEnAttente());
    }

    @Override
    public ResponseEntity<String> validerExamen(Long id) {
        examenService.updateExamenStatus(id, CoursStatus.VALIDE);
        return ResponseEntity.ok("Examen validé");
    }

    @Override
    public ResponseEntity<String> rejeterExamen(Long id) {
        examenService.updateExamenStatus(id, CoursStatus.VALIDE);
        return ResponseEntity.ok("Examen validé");
    }

    @Override
    public ResponseEntity<List<QuizResponseDTO>> getQuizzesEnAttente() {
        return ResponseEntity.ok(quizService.getQuizzesEnAttente());
    }

    @Override
    public ResponseEntity<String> validerQuiz(Long id) {
        quizService.updateQuizStatus(id, CoursStatus.VALIDE);
        return ResponseEntity.ok("Quiz validé");
    }

    @Override
    public ResponseEntity<String> rejeterQuiz(Long id) {
        quizService.updateQuizStatus(id, CoursStatus.REJETE);
        return ResponseEntity.ok("Quiz rejeté");
    }

    @Override
    public DashboardDTO getDashboard() {
        return adminService.getDashboardStats();
    }
}
