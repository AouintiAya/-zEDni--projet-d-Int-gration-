package com.zedni.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.zedni.backend.model.Examen;

public interface ExamenRepo extends JpaRepository<Examen,Long> {
    List<Examen> findByCoursId(Long coursId);
}
