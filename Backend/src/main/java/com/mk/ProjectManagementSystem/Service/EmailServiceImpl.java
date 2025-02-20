package com.mk.ProjectManagementSystem.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class EmailServiceImpl implements EmailService{
    private final JavaMailSender mailSender;

    public EmailServiceImpl(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Override
    public Boolean sendEmailWithToken(String userEmail, String link) throws MessagingException {

        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage,"utf-8");
        String subject = "Join Project Team Invitation";
        String body = "<h1>Join Project Team Invitation</h1><p>Click the link below to join this project.</p>"+link;
        mimeMessageHelper.setSubject(subject);
        mimeMessageHelper.setTo(userEmail);
        mimeMessageHelper.setText(body, true);
        try{
            mailSender.send(mimeMessage);
            return true;
        } catch (Exception e) {
            log.error("sendEmailWithTokenEmailServiceIMPL : ",e);
            return false;
        }
    }
}
