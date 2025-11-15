package com.zedni.backend.repository;

import com.zedni.backend.model.Ressource;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RessourceRepo extends JpaRepository<Ressource,Long> {
    List<Ressource> findByCoursId(Long coursId);
}
