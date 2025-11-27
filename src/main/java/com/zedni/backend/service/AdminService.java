package com.zedni.backend.service;

import com.zedni.backend.dto.DashboardDTO;
import com.zedni.backend.dto.Person.EnseignantDTO;
import com.zedni.backend.dto.Person.EtudiantDTO;

import java.util.List;

public interface AdminService {
    List<EnseignantDTO> getEnseignantAttende();
    List<EnseignantDTO>getEnseignantActif();
    void toggleEnableEnseignant(Long enseignantId);
    List<EtudiantDTO> getEtudiantsAttente();
    List<EtudiantDTO> getEtudiantsActifs();
    void toggleEnableEtudiant(Long id);
    DashboardDTO getDashboardStats();
}
