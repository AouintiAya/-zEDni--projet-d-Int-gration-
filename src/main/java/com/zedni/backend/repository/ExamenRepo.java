package com.zedni.backend.repository;

import com.zedni.backend.model.CoursStatus;
import com.zedni.backend.model.Examen;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExamenRepo extends JpaRepository<Examen,Long> {
    List<Examen> findByStatus(CoursStatus status);
}
