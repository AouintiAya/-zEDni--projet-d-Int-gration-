package com.zedni.backend.rest;

import com.zedni.backend.dto.LoginRequest;
import com.zedni.backend.dto.RegisterRequest;
import com.zedni.backend.dto.ResetPasswordRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

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


}
