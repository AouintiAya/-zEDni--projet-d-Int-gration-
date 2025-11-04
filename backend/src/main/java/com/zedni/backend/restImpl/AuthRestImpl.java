package com.zedni.backend.restImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RestController;

import com.zedni.backend.dto.AuthResponse;
import com.zedni.backend.dto.LoginRequest;
import com.zedni.backend.dto.RegisterRequest;
import com.zedni.backend.model.Users;
import com.zedni.backend.rest.AuthRest;
import com.zedni.backend.service.UserService;

@RestController
public class AuthRestImpl implements AuthRest {

    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private com.zedni.backend.service.JWTservice jwtService;

    @Override
    public ResponseEntity<String> register(RegisterRequest request) {
        String result = userService.register(request);
        if (result.equals("Registered successfully!")) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.badRequest().body(result);
        }
    }

    @Override
    public ResponseEntity<AuthResponse> login(LoginRequest request) {
        // Authentification
        Authentication authentication =
                authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
                );

        if (authentication.isAuthenticated()) {
            Users user = userService.findByEmail(request.getEmail());
            if (user == null) {
                throw new RuntimeException("User not found");
            }

            // Génère le token en incluant le rôle
            String token = jwtService.generateToken(user.getEmail(), user.getRole().name());

            AuthResponse response = new AuthResponse();
            response.setToken(token);
            response.setRole(user.getRole().name()); // Ajout du rôle dans la réponse

            return ResponseEntity.ok(response);
        }

        throw new RuntimeException("Invalid email/password");
    }
}
