package com.gouriny.portfolio_be.contactsubdomain;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendEmail(String name, String email, String subject, String message) {
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setFrom(fromEmail);
        mailMessage.setTo("igouriny@gmail.com");
        mailMessage.setSubject("New Contact Form Submission: " + subject);
        mailMessage.setText("From: " + name + " (" + email + ")\n\n" + message);

        mailSender.send(mailMessage);
    }
}
