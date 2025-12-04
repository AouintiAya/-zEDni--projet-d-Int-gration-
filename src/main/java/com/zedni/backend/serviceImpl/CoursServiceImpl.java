package com.zedni.backend.serviceImpl;
import com.zedni.backend.dto.Cours.CoursAdminDto;
import com.zedni.backend.dto.Cours.CoursDTO;
import com.zedni.backend.dto.Examen.ExamenDTO;
import com.zedni.backend.dto.Quiz.QuestionCreationDTO;
import com.zedni.backend.dto.Quiz.QuizResponseDTO;
import com.zedni.backend.dto.Ressource.RessourceDTO;
import com.zedni.backend.model.*;
import com.zedni.backend.repository.CoursRepo;
import com.zedni.backend.repository.EnseignantRepo;
import com.zedni.backend.repository.UserRepo;
import com.zedni.backend.service.CoursService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CoursServiceImpl implements CoursService {
    @Autowired
    private CoursRepo coursRepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private EnseignantRepo enseignantRepo;

    @Autowired
    private FileStorageService fileStorageService;

    @Override
    public CoursDTO createCours(String titre, String description, MultipartFile image, String email) throws IOException {
        // 1. Chercher le compte Users
        Users user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 2. Chercher l'enseignant correspondant
        Enseignant enseignant = enseignantRepo.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Enseignant non trouvé pour cet utilisateur"));

        Cours cours = new Cours();
        cours.setTitre(titre);
        cours.setDescription(description);
        cours.setStatus(CoursStatus.EN_ATTENTE);

        // Upload image si fournie
        if (image != null && !image.isEmpty()) {
            String imageUrl = fileStorageService.store(image);
            cours.setImageUrl(imageUrl);
        }
        cours.setEnseignant(enseignant);

        // 4. Sauvegarder
        coursRepo.save(cours);
        return new CoursDTO(
                cours.getId(),
                cours.getTitre(),
                cours.getDescription(),
                enseignant.getEmail(),
                cours.getImageUrl(),
                cours.getStatus().name(),
                new ArrayList<>());
    }

    private CoursAdminDto convert(Cours cours) {

        // Mapper les ressources
        List<RessourceDTO> ressources = cours.getRessources() != null
                ? cours.getRessources().stream()
                .map(r -> new RessourceDTO(r.getId(), r.getTitre(), r.getType(), r.getUrl(), cours.getId()))
                .toList()
                : List.of();

        // Mapper les examens
        List<ExamenDTO> examens = cours.getExamens() != null
                ? cours.getExamens().stream()
                .map(e -> new ExamenDTO(e.getId(), e.getTitre(), e.getUrl(), cours.getId(), e.getStatus().name()))
                .toList()
                : List.of();

        // Mapper les quizzes via mapQuizToDTO
        List<QuizResponseDTO> quizzes = cours.getQuizzes() != null
                ? cours.getQuizzes().stream()
                .map(this::mapQuizToDTO)
                .toList()
                : List.of();

        return new CoursAdminDto(
                cours.getId(),
                cours.getTitre(),
                cours.getDescription(),
                cours.getEnseignant().getUser().getEmail(),
                cours.getImageUrl(),
                cours.getStatus().name(),
                ressources,
                examens,
                quizzes
        );
    }

    private QuizResponseDTO mapQuizToDTO(Quiz quiz) {
        List<QuestionCreationDTO> questionsDTO = quiz.getQuestions() != null
                ? quiz.getQuestions().stream()
                .map(q -> new QuestionCreationDTO(q.getId(), q.getTexte(),""))
                .toList()
                : List.of();

        return new QuizResponseDTO(
                quiz.getId(),
                quiz.getTitre(),
                quiz.getCours().getId(),
                questionsDTO,
                quiz.getStatus()
        );
    }



    @Override
    @Transactional(readOnly = true)
    public List<CoursDTO> getAllCours() {
        return coursRepo.findByStatus(CoursStatus.VALIDE)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    @Override
    public List<CoursAdminDto> gettousCours() {
        List<Cours> coursList = coursRepo.findAllWithEnseignantEagerly();

        return coursList.stream()
                .map(this::convert) // Maintenant convertToDTO peut accéder à l'enseignant
                .collect(Collectors.toList());
    }

    @Transactional
    @Override
    public CoursAdminDto getCours(Long id) {
        Optional<Cours> coursOpt = coursRepo.findById(id);

        // Vérifier si le cours existe
        if (coursOpt.isPresent()) {
            return convert(coursOpt.get()); // extraire le Cours de l'Optional
        } else {
            // Gérer le cas où le cours n'existe pas
            throw new RuntimeException("Cours avec id " + id + " non trouvé");
            // ou return null; selon ton choix
        }
    }



    private CoursDTO convertToDTO(Cours cours) {
        List<RessourceDTO> ressourceDTOs = cours.getRessources() != null
                ? cours.getRessources().stream()
                .map(r -> new RessourceDTO(
                        r.getId(),
                        r.getTitre(),
                        r.getType(),
                        r.getUrl(),
                        r.getCours().getId()))
                .collect(Collectors.toList())
                : new ArrayList<>();

        return new CoursDTO(
                cours.getId(),
                cours.getTitre(),
                cours.getDescription(),
                cours.getEnseignant() != null ? cours.getEnseignant().getEmail() : null,
                cours.getImageUrl(),
                cours.getStatus().name(),// << CORRECT NOW
                ressourceDTOs
        );
    }

    @Transactional(readOnly = true)
    @Override
    public CoursDTO getCoursByIdDTO(Long id) {
        Cours cours = coursRepo.findByIdWithRessources(id)
                .orElseThrow(() -> new RuntimeException("Cours not found"));
        return convertToDTO(cours);
    }

    @Override
    public void deleteCours(Long id) {
        Cours cours = coursRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Cours not found"));

        coursRepo.delete(cours);
    }

    @Transactional
    @Override
    public CoursDTO updateCours(Long id, String titre, String description, MultipartFile image, String email) throws IOException {
        Cours cours = coursRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Cours non trouvé"));


        // Vérifie que l'enseignant courant est bien le propriétaire
        Users user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 2. Chercher l'enseignant correspondant
        Enseignant enseignant = enseignantRepo.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Enseignant non trouvé pour cet utilisateur"));

        if (titre != null) cours.setTitre(titre);
        if (description != null) cours.setDescription(description);

        // Upload image si fournie
        if (image != null && !image.isEmpty()) {
            // Supprimer l'ancienne image si existante
            if (cours.getImageUrl() != null) {
                fileStorageService.delete(cours.getImageUrl());
            }
            String imageUrl = fileStorageService.store(image);
            cours.setImageUrl(imageUrl);
        }
        coursRepo.save(cours);
        System.out.println("Updating course ID: " + id);
        return convertToDTO(cours);
    }

    @Transactional(readOnly = true)
    public List<CoursDTO> getCoursByEnseignantEmail(String email) {
        Enseignant enseignant = enseignantRepo.findByUserEmail(email)
                .orElseThrow(() -> new RuntimeException("Enseignant not found"));

        List<Cours> cours = coursRepo.findByEnseignantId(enseignant.getId());

        return cours.stream()
                .map(this::convertToDTO)  // <-- utiliser this::convertToDTO
                .collect(Collectors.toList());
    }

    @Transactional
    public void updateCoursStatus(Long coursId, CoursStatus status) {
        Cours cours = coursRepo.findById(coursId)
                .orElseThrow(() -> new RuntimeException("Cours not found"));

        cours.setStatus(status);
        coursRepo.save(cours);
    }

    @Transactional(readOnly = true)
    public List<CoursDTO> getCoursEnAttente() {
        return coursRepo.findByStatus(CoursStatus.EN_ATTENTE)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }




}
