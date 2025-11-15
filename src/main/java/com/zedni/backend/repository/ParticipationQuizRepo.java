package com.zedni.backend.repository;

import com.zedni.backend.model.ParticipationQuiz;
import com.zedni.backend.model.Quiz;
import com.zedni.backend.model.Users;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ParticipationQuizRepo extends JpaRepository<ParticipationQuiz, Long> {
    Optional<ParticipationQuiz> findByQuizAndStudent(Quiz quiz, Users student);
    List<ParticipationQuiz> findByQuiz(Quiz quiz);

    @Transactional
    @Modifying
    @Query("DELETE FROM ParticipationQuiz p WHERE p.quiz = :quiz")
    void deleteByQuiz(@Param("quiz") Quiz quiz);
}