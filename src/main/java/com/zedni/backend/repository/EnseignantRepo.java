package com.zedni.backend.repository;


import com.zedni.backend.model.Enseignant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EnseignantRepo extends JpaRepository<Enseignant,Long> {
}
