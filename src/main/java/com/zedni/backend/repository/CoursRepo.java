package com.zedni.backend.repository;

import com.zedni.backend.model.Cours;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CoursRepo extends JpaRepository<Cours,Long> {
    @EntityGraph(attributePaths = "ressources")
    List<Cours> findAll();
    @Query("SELECT c FROM Cours c LEFT JOIN FETCH c.ressources WHERE c.id = :id")
    Optional<Cours> findByIdWithRessources(@Param("id") Long id);

}
