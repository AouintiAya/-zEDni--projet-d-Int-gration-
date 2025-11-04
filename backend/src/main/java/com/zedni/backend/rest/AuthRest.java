package com.zedni.backend.rest;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.zedni.backend.dto.AuthResponse;
import com.zedni.backend.dto.LoginRequest;
import com.zedni.backend.dto.RegisterRequest;

@RequestMapping("/auth")
public interface AuthRest {
    @PostMapping("/register")
    ResponseEntity<String> register(@RequestBody RegisterRequest request);

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(LoginRequest request);
}
