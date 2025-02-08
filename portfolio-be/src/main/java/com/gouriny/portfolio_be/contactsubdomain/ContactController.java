package com.gouriny.portfolio_be.contactsubdomain;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/contact")
public class ContactController {
    private final EmailService emailService;

    public ContactController(EmailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping
    public ResponseEntity<String> sendContactEmail(@RequestBody ContactRequest request) {
        emailService.sendEmail(request.getName(), request.getEmail(), request.getSubject(), request.getMessage());
        return ResponseEntity.ok("Email sent successfully!");
    }
}

