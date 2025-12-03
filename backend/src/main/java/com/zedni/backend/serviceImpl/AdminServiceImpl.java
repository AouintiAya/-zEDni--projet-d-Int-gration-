package com.zedni.backend.serviceImpl;

import com.zedni.backend.dto.DashboardDTO;
import com.zedni.backend.dto.Person.EnseignantDTO;
import com.zedni.backend.dto.Person.EtudiantDTO;
import com.zedni.backend.model.Enseignant;
import com.zedni.backend.model.Etudiant;
import com.zedni.backend.model.Users;
import com.zedni.backend.repository.CoursRepo;
import com.zedni.backend.repository.EnseignantRepo;
import com.zedni.backend.repository.EtudiantRepo;
import com.zedni.backend.repository.UserRepo;
import com.zedni.backend.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private EnseignantRepo enseignantRepo;

    @Autowired
    private EtudiantRepo etudiantRepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private CoursRepo coursRepo;

    // ---------- ENSEIGNANT  ----------
    @Override
    public List<EnseignantDTO> getEnseignantAttende() {
        return enseignantRepo.findByUser_Enabled(false)
                .stream().map(this::toEnseignantDTO).toList();
    }

    @Override
    public List<EnseignantDTO> getEnseignantActif() {
        return enseignantRepo.findByUser_Enabled(true)
                .stream().map(this::toEnseignantDTO).toList();
    }

    @Override
    public void toggleEnableEnseignant(Long enseignantId) {
        Enseignant ens = enseignantRepo.findById(enseignantId)
                .orElseThrow(() -> new RuntimeException("Enseignant not found"));
        Users u = ens.getUser();
        u.setEnabled(!u.isEnabled());
        userRepo.save(u);
    }

    private EnseignantDTO toEnseignantDTO(Enseignant e) {
        return new EnseignantDTO(
                e.getId(),
                e.getNom(),
                e.getPrenom(),
                e.getEmail(),
                e.getUser().isEnabled()
        );
    }


    // ---------- ETUDIANT----------
    @Override
    public List<EtudiantDTO> getEtudiantsAttente() {
        return etudiantRepo.findByUser_Enabled(false)
                .stream().map(this::toEtudiantDTO).toList();
    }

    @Override
    public List<EtudiantDTO> getEtudiantsActifs() {
        return etudiantRepo.findByUser_Enabled(true)
                .stream().map(this::toEtudiantDTO).toList();
    }

    @Override
    public void toggleEnableEtudiant(Long etudiantId) {
        Etudiant etu = etudiantRepo.findById(etudiantId)
                .orElseThrow(() -> new RuntimeException("Etudiant not found"));
        Users u = etu.getUser();
        u.setEnabled(!u.isEnabled());
        userRepo.save(u);
    }

    private EtudiantDTO toEtudiantDTO(Etudiant e) {
        return new EtudiantDTO(
                e.getId(),
                e.getNom(),
                e.getPrenom(),
                e.getEmail(),
                e.getUser().isEnabled()
        );
    }

    @Override
    public com.zedni.backend.dto.DashboardDTO getDashboardStats() {
        Long nbEtudiants = userRepo.count(); // si User contient tous les étudiants
        Long nbEnseignants = enseignantRepo.count();
        Long nbCours = coursRepo.count();

        return new DashboardDTO(nbEtudiants, nbEnseignants, nbCours);
    }
}
