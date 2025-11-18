package com.zedni.backend.restImpl;

import com.zedni.backend.dto.Cours.DashboardDTO;
import com.zedni.backend.model.Cours;
import com.zedni.backend.model.Enseignant;
import com.zedni.backend.repository.CoursRepo;
import com.zedni.backend.repository.EnseignantRepo;
import com.zedni.backend.repository.ParticipationCoursRepo;
import com.zedni.backend.rest.Dashboard;
import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;

@Service
public class DashboardImpl implements Dashboard {
    @Autowired
    private EnseignantRepo enseignantRepository;

    @Autowired
    private ParticipationCoursRepo participationCoursRepository;

    @Autowired
    private CoursRepo coursRepo;

    @Override
    public ResponseEntity<DashboardDTO> getTeacherDashboard(Principal principal) {
        String email = principal.getName();
        Enseignant enseignant = enseignantRepository.findByUserEmail(email)
                .orElseThrow(() -> new RuntimeException("Enseignant not found"));

        List<Cours> courses = coursRepo.findByEnseignantId(enseignant.getId());
        int totalCourses = courses.size();
        int totalStudents = courses.stream()
                .mapToInt(c -> participationCoursRepository.findByCoursId(c.getId()).size())
                .sum();

        DashboardDTO dashboardDTO = new DashboardDTO(totalCourses, totalStudents);
        return ResponseEntity.ok(dashboardDTO);
}

}
