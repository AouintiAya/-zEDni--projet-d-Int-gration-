package com.zedni.backend.repository;

import com.zedni.backend.model.Examen;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExamenRepo extends JpaRepository<Examen,Long> {
}
