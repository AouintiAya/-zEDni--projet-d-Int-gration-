package com.zedni.backend.restImpl;

import com.zedni.backend.dto.Quiz.ParticipationQuizResponseDTO;
import com.zedni.backend.dto.Quiz.QuizNotationRequest;
import com.zedni.backend.dto.Quiz.QuizResponseDTO;
import com.zedni.backend.dto.Quiz.QuizSubmissionRequest;
import com.zedni.backend.model.ParticipationQuiz;
import com.zedni.backend.model.Quiz;
import com.zedni.backend.rest.QuizRest;
import com.zedni.backend.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class QuizRestImpl implements QuizRest {

    @Autowired
    private QuizService quizService;

    private String getAuthenticatedUserEmail() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

    @Override
    public ResponseEntity<QuizResponseDTO > saveQuiz(QuizResponseDTO  quiz) {
        try {
            QuizResponseDTO  savedQuiz = quizService.saveQuiz(quiz);
            return new ResponseEntity<>(savedQuiz, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @Override
    public ResponseEntity<ParticipationQuizResponseDTO> submitParticipation(QuizSubmissionRequest request) {
        try {
            ParticipationQuizResponseDTO participation = quizService.submitParticipation(request, getAuthenticatedUserEmail());
            return new ResponseEntity<>(participation, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<ParticipationQuizResponseDTO> noteParticipation(QuizNotationRequest request) {
        try {
            ParticipationQuizResponseDTO participation = quizService.noteParticipation(request);
            return new ResponseEntity<>(participation, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<QuizResponseDTO> getQuizById(Long quizId) {
        try {
            QuizResponseDTO quiz = quizService.getQuizById(quizId);
            return new ResponseEntity<>(quiz, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<List<ParticipationQuizResponseDTO>> getParticipationsByQuizId(Long quizId) {
        try {
            List<ParticipationQuizResponseDTO> participations = quizService.getParticipationsByQuizId(quizId);
            return new ResponseEntity<>(participations, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<ParticipationQuizResponseDTO> getParticipationByQuizAndStudent(Long quizId) {
        try {
            ParticipationQuizResponseDTO participation = quizService.getParticipationByQuizAndStudent(quizId, getAuthenticatedUserEmail());
            if (participation == null) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(participation, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<String> deleteQuiz(Long id) {
        try {
            quizService.deleteQuiz(id);
            return ResponseEntity.ok("Quiz supprimé avec succès !");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}
