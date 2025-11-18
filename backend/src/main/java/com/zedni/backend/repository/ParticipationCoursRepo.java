package com.zedni.backend.repository;

import com.zedni.backend.model.ParticipationCours;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ParticipationCoursRepo extends JpaRepository<ParticipationCours, Long> {

    boolean existsByEtudiantIdAndCoursId(Long etudiantId, Long coursId);

    List<ParticipationCours> findByEtudiantId(Long etudiantId);

    List<ParticipationCours> findByCoursId(Long coursId);

    void deleteByEtudiantIdAndCoursId(Long etudiantId, Long coursId);

}