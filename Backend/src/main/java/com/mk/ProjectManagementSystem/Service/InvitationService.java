package com.mk.ProjectManagementSystem.Service;

import com.mk.ProjectManagementSystem.model.Invitation;
import jakarta.mail.MessagingException;

public interface InvitationService {
    Boolean sendInvitation(String email, Long projectId) throws MessagingException;

    Invitation acceptInvitation(String token, Long userId);

    String getTokenByUserMail(String email);

    Boolean deleteToken(String token);
}
