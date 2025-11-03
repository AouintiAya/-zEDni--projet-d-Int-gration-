package com.zedni.backend.rest;

import com.zedni.backend.dto.LoginRequest;
import com.zedni.backend.dto.RegisterRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/auth")
public interface AuthRest {
    @PostMapping("/register")
    ResponseEntity<String> register(@RequestBody RegisterRequest request);

    @PostMapping("/login")
    ResponseEntity<String> login(@RequestBody LoginRequest request);

}
