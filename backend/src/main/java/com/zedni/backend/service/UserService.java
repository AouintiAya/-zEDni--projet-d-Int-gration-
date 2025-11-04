package com.zedni.backend.service;

import com.zedni.backend.dto.RegisterRequest;
import com.zedni.backend.model.Users;

public interface UserService {
    public String register(RegisterRequest request);
    public String login (String username, String password);
    public Users findByEmail(String email);
}
