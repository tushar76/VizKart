package com.example.controller;

import com.example.model.EmailRequest;
import com.example.repository.EmailRequestRepository;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/emails")
@CrossOrigin(origins = "*")
public class EmailController {

    private final JavaMailSender mailSender;
    private final EmailRequestRepository emailRequestRepository;

    public EmailController(JavaMailSender mailSender, EmailRequestRepository emailRequestRepository) {
        this.mailSender = mailSender;
        this.emailRequestRepository = emailRequestRepository;
    }

    @PostMapping("/send")
    public String sendEmailReport(@RequestBody EmailRequest request) {
        try {
           
            emailRequestRepository.save(request);

            
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(request.getTo());
            message.setSubject(request.getSubject());
            message.setText(request.getBody());

            mailSender.send(message);
            return "Email sent and saved successfully!";
        } catch (Exception e) {
            e.printStackTrace();
            return "Error sending email: " + e.getMessage();
        }
    }

    @GetMapping
    public List<EmailRequest> getAllEmails() {
        return emailRequestRepository.findAll();
    }
}
