package com.zedni.backend.repository;


import com.zedni.backend.model.Enseignant;
import com.zedni.backend.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EnseignantRepo extends JpaRepository<Enseignant,Long> {
    Optional<Enseignant> findByUser(Users user);
    Optional<Enseignant> findByUserEmail(String email);
    List<Enseignant> findByUser_Enabled(boolean enabled);



}
