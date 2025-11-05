package com.zedni.backend.service;

public interface EmailService {
    public void sendOtpEmail(String to, String otp);
}
