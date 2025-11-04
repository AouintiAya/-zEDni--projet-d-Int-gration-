package com.zedni.backend.service;


import org.springframework.security.core.userdetails.UserDetails;

public interface JWTservice {
    String generateToken(UserDetails userDetails);
    String extractUsername(String token);
    boolean validateToken(String token, UserDetails userDetails);


}
