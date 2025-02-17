package com.example.controller;

import com.example.model.EmailRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class EmailController {

    @Autowired
    private JavaMailSender mailSender;

    @PostMapping("/send-email-report")
    public String sendEmailReport(@RequestBody EmailRequest request) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(request.getTo());
            message.setSubject(request.getSubject());
            message.setText(request.getBody());

            mailSender.send(message);
            return "Email sent successfully!";
        } catch (Exception e) {
            e.printStackTrace();
            return "Error sending email: " + e.getMessage();
        }
    }
}
