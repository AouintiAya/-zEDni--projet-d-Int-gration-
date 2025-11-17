package com.zedni.backend.repository;

import com.zedni.backend.model.Etudiant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EtudiantRepo extends JpaRepository<Etudiant,Long> {
    Optional<Etudiant> findByUserEmail(String email);
}
