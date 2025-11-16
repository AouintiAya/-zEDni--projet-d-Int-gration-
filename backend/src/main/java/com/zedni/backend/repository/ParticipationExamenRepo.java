package com.zedni.backend.repository;

import com.zedni.backend.model.Examen;
import com.zedni.backend.model.ParticipationExamen;
import com.zedni.backend.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ParticipationExamenRepo extends JpaRepository<ParticipationExamen,Long> {
    Optional<ParticipationExamen> findByExamenAndStudent(Examen examen, Users student);
    List<ParticipationExamen> findByExamen(Examen examen);
}
