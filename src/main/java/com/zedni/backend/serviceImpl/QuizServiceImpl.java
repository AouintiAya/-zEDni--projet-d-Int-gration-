package com.zedni.backend.serviceImpl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.zedni.backend.dto.Cours.CoursDTO;
import com.zedni.backend.dto.Person.EtudiantDTO;
import com.zedni.backend.dto.Quiz.*;
import com.zedni.backend.model.*;
import com.zedni.backend.repository.CoursRepo;
import com.zedni.backend.repository.ParticipationQuizRepo;
import com.zedni.backend.repository.QuizRepo;
import com.zedni.backend.repository.UserRepo;
import com.zedni.backend.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class QuizServiceImpl implements QuizService {

    @Autowired
    private QuizRepo quizRepo;

    @Autowired
    private ParticipationQuizRepo participationQuizRepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private CoursRepo coursRepo;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public QuizResponseDTO  saveQuiz(QuizResponseDTO  dto) {
        Cours cours = coursRepo.findById(dto.getIdCours())
                .orElseThrow(() -> new RuntimeException("Cours non trouvé"));

        Quiz quiz = new Quiz();
        quiz.setTitre(dto.getTitre());
        quiz.setCours(cours);

        List<Question> questions = dto.getQuestions().stream()
                .map(q -> {
                    Question question = new Question();
                    question.setTexte(q.getEnonce());
                    question.setReponseCorrecte(q.getReponseCorrecte());
                    question.setQuiz(quiz);
                    return question;
                })
                .collect(Collectors.toList());

        quiz.setQuestions(questions);


        Quiz saved = quizRepo.save(quiz);

        return toQuizResponseDTO(saved);
    }

    @Override
    public ParticipationQuizResponseDTO submitParticipation(QuizSubmissionRequest request, String studentEmail) {
        Optional<Quiz> quizOpt = quizRepo.findById(request.getQuizId());
        Optional<Users> studentOpt = userRepo.findByEmail(studentEmail);

        if (quizOpt.isEmpty() || studentOpt.isEmpty()) {
            throw new RuntimeException("Quiz ou étudiant non trouvé.");
        }

        Quiz quiz = quizOpt.get();
        Users student = studentOpt.get();

        // Chercher une participation existante ou en créer une nouvelle
        Optional<ParticipationQuiz> participationOpt = participationQuizRepo.findByQuizAndStudent(quiz, student);
        ParticipationQuiz participation = participationOpt.orElseGet(ParticipationQuiz::new);

        participation.setQuiz(quiz);
        participation.setStudent(student);

        try {
            // Reponses is a Map<Long, String> where Long is Question ID and String is the chosen answer
            String reponsesJson = objectMapper.writeValueAsString(request.getReponses());
            participation.setReponses(reponsesJson);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Erreur lors de la sérialisation des réponses.", e);
        }

        ParticipationQuiz saved = participationQuizRepo.save(participation);
        return toParticipationResponseDTO(saved);
    }

    @Override
    public ParticipationQuizResponseDTO noteParticipation(QuizNotationRequest request) {
        Optional<ParticipationQuiz> participationOpt = participationQuizRepo.findById(request.getParticipationId());

        if (participationOpt.isEmpty()) {
            throw new RuntimeException("Participation non trouvée.");
        }

        ParticipationQuiz participation = participationOpt.get();
        participation.setNote(request.getNote());
        participation.setCorrigé(true);

        ParticipationQuiz saved = participationQuizRepo.save(participation);
        return toParticipationResponseDTO(saved);
    }

    @Override
    public QuizResponseDTO getQuizById(Long quizId) {
        // Récupère seulement le quiz et son cours (évite de toucher à Enseignant/User)
        Quiz quiz = quizRepo.findQuizById(quizId)
                .orElseThrow(() -> new RuntimeException("Quiz non trouvé."));

        QuizResponseDTO dto = new QuizResponseDTO();
        dto.setId(quiz.getId());
        dto.setTitre(quiz.getTitre());

        // Récupération minimale du cours
        if (quiz.getCours() != null) {
            dto.setIdCours(quiz.getCours().getId());
            dto.setTitre(quiz.getCours().getTitre()); // si tu veux le titre du cours
        }

        // Récupération des questions du quiz
        if (quiz.getQuestions() != null && !quiz.getQuestions().isEmpty()) {
            List<QuestionCreationDTO> questionDTOs = quiz.getQuestions().stream()
                    .map(q -> {
                        QuestionCreationDTO qDto = new QuestionCreationDTO();
                        qDto.setId(q.getId());
                        qDto.setEnonce(q.getTexte());
                        qDto.setReponseCorrecte(q.getReponseCorrecte()); // si besoin
                        return qDto;
                    })
                    .collect(Collectors.toList());
            dto.setQuestions(questionDTOs);
        }

        return dto;
    }

    @Override
    public List<ParticipationQuizResponseDTO> getParticipationsByQuizId(Long quizId) {
        Quiz quiz = quizRepo.findById(quizId).orElseThrow(() -> new RuntimeException("Quiz non trouvé."));
        return participationQuizRepo.findByQuiz(quiz).stream()
                .map(this::toParticipationResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ParticipationQuizResponseDTO getParticipationByQuizAndStudent(Long quizId, String studentEmail) {
        Quiz quiz = quizRepo.findById(quizId).orElseThrow(() -> new RuntimeException("Quiz non trouvé."));
        Users student = userRepo.findByEmail(studentEmail).orElseThrow(() -> new RuntimeException("Étudiant non trouvé."));
        ParticipationQuiz participation = participationQuizRepo.findByQuizAndStudent(quiz, student).orElse(null);
        return participation != null ? toParticipationResponseDTO(participation) : null;
    }

    @Transactional
    @Override
    public void deleteQuiz(Long id) {
        Quiz quiz = quizRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Quiz non trouvé"));

        // Supprime toutes les participations liées
        participationQuizRepo.deleteByQuiz(quiz);

        // Supprime le quiz
        quizRepo.delete(quiz);

    }

    // --- Conversion Methods ---

    private CoursDTO toCoursDTO(Cours cours) {
        if (cours == null) return null;
        CoursDTO dto = new CoursDTO();
        dto.setId(cours.getId());
        dto.setTitre(cours.getTitre());
        // Add other safe fields from Cours model if needed
        return dto;
    }

    private EtudiantDTO toStudentDTO(Users student) {
        if (student == null) return null;
        EtudiantDTO dto = new EtudiantDTO();
        dto.setId(student.getId());
        dto.setEmail(student.getEmail());
        dto.setRole(student.getRole());
        // Add other safe fields from Users model if needed
        return dto;
    }

    private QuestionResponseDTO toQuestionResponseDTO(Question question) {
        if (question == null) return null;

        QuestionResponseDTO dto = new QuestionResponseDTO();
        dto.setId(question.getId());
        dto.setEnonce(question.getTexte()); // correspondance texte → enonce
        return dto;
    }


    private QuizResponseDTO toQuizResponseDTO(Quiz quiz) {
        if (quiz == null) return null;

        QuizResponseDTO dto = new QuizResponseDTO();
        dto.setId(quiz.getId());
        dto.setTitre(quiz.getTitre());

        // Ici on ne retourne que l'id du cours
        dto.setIdCours(quiz.getCours() != null ? quiz.getCours().getId() : null);

        // Convert questions to QuestionCreationDTO (sans exposer reponseCorrecte si nécessaire)
        if (quiz.getQuestions() != null) {
            List<QuestionCreationDTO> questionDTOs = quiz.getQuestions().stream()
                    .map(q -> {
                        QuestionCreationDTO qdto = new QuestionCreationDTO();
                        qdto.setId(q.getId());
                        qdto.setEnonce(q.getTexte());
                        // Optionnel : si tu ne veux pas exposer la réponse correcte, ne pas la mettre ici
                        // qdto.setReponseCorrecte(q.getReponseCorrecte());
                        return qdto;
                    })
                    .collect(Collectors.toList());

            dto.setQuestions(questionDTOs);
        }

        return dto;
    }




    private ParticipationQuizResponseDTO toParticipationResponseDTO(ParticipationQuiz p) {
        if (p == null) return null;
        ParticipationQuizResponseDTO dto = new ParticipationQuizResponseDTO();
        dto.setId(p.getId());
        dto.setStudent(toStudentDTO(p.getStudent()));
        dto.setNote(p.getNote());
        dto.setCorrige(p.getCorrigé());
        dto.setQuizId(p.getQuiz().getId());

        try {
            // Convert JSON string of responses back to Map<Long, String>
            // Assuming the JSON is a Map<String, String> where key is Question ID (as string)
            // and value is the chosen answer (as string).
            Map<String, String> jsonMap = objectMapper.readValue(p.getReponses(), Map.class);
            Map<Long, String> reponsesMap = jsonMap.entrySet().stream()
                    .collect(Collectors.toMap(
                            e -> Long.valueOf(e.getKey()),
                            Map.Entry::getValue
                    ));
            dto.setReponses(reponsesMap);
        } catch (JsonProcessingException e) {
            // Log the error and return an empty map or throw a runtime exception
            // For robustness, I'll return an empty map and log (if logging was available)
            System.err.println("Error deserializing quiz responses: " + e.getMessage());
            dto.setReponses(Map.of());
        }

        return dto;
    }
}
