package com.zedni.backend.serviceImpl;


import com.zedni.backend.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImpl implements EmailService {
    @Autowired
    private JavaMailSender mailSender;
    @Override
    public void sendOtpEmail(String to, String otp) {
        String emailmessage =
                "Dear User,\n\n"
                        + "Your Zedni security verification code is: " + otp + "\n"
                        + "This One-Time Password (OTP) will expire in 10 minutes.\n\n"
                        + "If you did not request this action, please ignore this email or contact support.\n\n"
                        + "Best regards,\n"
                        + "Zedni E-Learning Platform";
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Zedni Verification Code");
        message.setText(emailmessage);
                mailSender.send(message);
    }


}
