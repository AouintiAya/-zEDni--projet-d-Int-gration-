package com.zedni.backend.serviceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.zedni.backend.dto.RegisterRequest;
import com.zedni.backend.model.Enseignant;
import com.zedni.backend.model.Etudiant;
import com.zedni.backend.model.Role;
import com.zedni.backend.model.Users;
import com.zedni.backend.repository.EnseignantRepo;
import com.zedni.backend.repository.EtudiantRepo;
import com.zedni.backend.repository.UserRepo;
import com.zedni.backend.service.UserService;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepo userRepo;

    @Autowired
    private EtudiantRepo etudiantRepo;

    @Autowired
    private EnseignantRepo enseignantRepo;

    @Autowired
    private JWTserviceImpl jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    @Override
    public String register(RegisterRequest req) {
        if (userRepo.findByEmail(req.getEmail()).isPresent()) {
            return "Email already exists";
        }

        Users user = new Users();
        user.setEmail(req.getEmail());
        user.setPassword(encoder.encode(req.getPassword()));
        user.setRole(Role.valueOf(req.getRole().toUpperCase()));
        userRepo.save(user);

        if (req.getRole().equalsIgnoreCase("ETUDIANT")) {
            Etudiant etu = new Etudiant();
            etu.setNom(req.getNom());
            etu.setPrenom(req.getPrenom());
            etu.setEmail(req.getEmail());
            etu.setUser(user);
            etudiantRepo.save(etu);

        } else if (req.getRole().equalsIgnoreCase("ENSEIGNANT")) {
            if (!"zedni2025".equals(req.getCode())) {
                throw new RuntimeException("Invalid registration code for Enseignant");
            }
            Enseignant ens = new Enseignant();
            ens.setNom(req.getNom());
            ens.setPrenom(req.getPrenom());
            ens.setEmail(req.getEmail());
            ens.setUser(user);
            enseignantRepo.save(ens);

        } else {
            return "Role not valid";
        }

        return "Registered successfully!";
    }

    @Override
    public String login(String email, String password) {
        Authentication authentication =
                authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));

        if (authentication.isAuthenticated()) {
            Users user = userRepo.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            // Génère le token en incluant le rôle
            return jwtService.generateToken(user.getEmail(), user.getRole().name());
        }

        throw new RuntimeException("Invalid email/password");
    }

    @Override
    public Users findByEmail(String email) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findByEmail'");
    }
    
}
