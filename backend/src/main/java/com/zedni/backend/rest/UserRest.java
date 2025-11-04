package com.zedni.backend.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zedni.backend.dto.UserDto;
import com.zedni.backend.model.Users;
import com.zedni.backend.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserRest {

    @Autowired
    private UserService userService;

    @GetMapping("/me")
    public ResponseEntity<UserDto> getCurrentUser(@AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(401).build();
        }

        Users user = userService.findByEmail(userDetails.getUsername());
        if (user == null) {
            return ResponseEntity.notFound().build();
        }

        // Convert enum Role to String
        String role = user.getRole() != null ? user.getRole().name() : "UNKNOWN";

        // Création du DTO
        UserDto userDto = new UserDto(user.getId(), user.getEmail(), role);

        return ResponseEntity.ok(userDto);
    }
}
