package com.zedni.backend.rest;

import com.zedni.backend.dto.Cours.DashboardDTO;
import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/api/dashboard")
public interface Dashboard {
    @GetMapping("/enseignant")
    public ResponseEntity<DashboardDTO> getTeacherDashboard(Principal principal);
}
