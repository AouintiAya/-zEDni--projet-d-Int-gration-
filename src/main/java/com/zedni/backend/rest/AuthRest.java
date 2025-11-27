package com.zedni.backend.rest;

import com.zedni.backend.dto.Auth.LoginRequest;
import com.zedni.backend.dto.Auth.RegisterRequest;
import com.zedni.backend.dto.Auth.ResetPasswordRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Map;

@RequestMapping("/auth")
public interface AuthRest {
    @PostMapping("/register")
    ResponseEntity<String> register(@RequestBody RegisterRequest request);

    @PostMapping("/login")
    ResponseEntity<String> login(@RequestBody LoginRequest request);

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> request);

    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestBody Map<String, String> body);

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordRequest req);

    @PostMapping("/admin/login")
     ResponseEntity<?> loginAdmin(@RequestBody LoginRequest request) ;




}
