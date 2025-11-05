package com.zedni.backend.restImpl;

import com.zedni.backend.dto.LoginRequest;
import com.zedni.backend.dto.RegisterRequest;
import com.zedni.backend.dto.ResetPasswordRequest;
import com.zedni.backend.rest.AuthRest;
import com.zedni.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

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

    @Override
    public ResponseEntity<?> forgotPassword(Map<String, String> request) {
        String email = request.get("email");
        userService.sendOtp(email);
        return ResponseEntity.ok("OTP sent to email");

    }

    @Override
    public ResponseEntity<?> verifyOtp(Map<String, String> body) {
        String email = body.get("email");
        String otp = body.get("otp");
        boolean ok = userService.verifyOtp(email, otp);
        if (ok) return ResponseEntity.ok("OTP verified");
        return ResponseEntity.badRequest().body("Invalid or expired OTP");
    }

    @Override
    public ResponseEntity<?> resetPassword(ResetPasswordRequest req) {
        boolean ok = userService.verifyOtp(req.getEmail(), req.getOtp());
        if (!ok) return ResponseEntity.badRequest().body("Invalid or expired OTP");
                userService.resetPassword(req.getEmail(), req.getNewPassword());
        return ResponseEntity.ok("Password reset successfully");

    }
}
