package com.mk.ProjectManagementSystem.Service;

import jakarta.mail.MessagingException;

public interface EmailService {
    Boolean sendEmailWithToken(String userEmail,String link) throws MessagingException;
}
