package com.zedni.backend.restImpl;

import com.zedni.backend.dto.LoginRequest;
import com.zedni.backend.dto.RegisterRequest;
import com.zedni.backend.rest.AuthRest;
import com.zedni.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthRestImpl implements AuthRest {
    @Autowired
    UserService userService ;
    @Override
    public ResponseEntity<String> register(RegisterRequest request) {
        String result = userService.register(request);
        if(result.equals("Registered successfully!")) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.badRequest().body(result);
        }
    }

    @Override
    public ResponseEntity<String> login(LoginRequest request) {
        String token = userService.login(request.getEmail(), request.getPassword());
        return ResponseEntity.ok(token);
    }
}
