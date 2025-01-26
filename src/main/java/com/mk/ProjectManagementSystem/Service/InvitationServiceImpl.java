package com.mk.ProjectManagementSystem.Service;

import com.mk.ProjectManagementSystem.model.Invitation;
import com.mk.ProjectManagementSystem.model.Project;
import com.mk.ProjectManagementSystem.repository.InvitationRepository;
import jakarta.mail.MessagingException;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class InvitationServiceImpl implements InvitationService {

    private final InvitationRepository invitationRepository;
    private final EmailService emailService;
    private final ProjectService projectService;

    public InvitationServiceImpl(InvitationRepository invitationRepository, EmailService emailService, ProjectService projectService) {
        this.invitationRepository = invitationRepository;
        this.emailService = emailService;
        this.projectService = projectService;
    }

    @Override
    public Boolean sendInvitation(String email, Long projectId) throws MessagingException {
        Project project = projectService.getProjectById(projectId);
        if (email == null || email.isEmpty() || project == null) {
            return false;
        }
        String invitationToken = UUID.randomUUID().toString();
        Invitation invitation = new Invitation();
        invitation.setEmail(email);
        invitation.setProjectId(projectId);
        invitation.setToken(invitationToken);
        invitationRepository.save(invitation);
        String invitationLink ="${FRONTEND_URL}/accept_invitation?token=" + invitationToken;
        return emailService.sendEmailWithToken(email, invitationLink);
    }

    @Override
    public Invitation acceptInvitation(String token, Long userId) {
        return invitationRepository.findByToken(token);
    }

    @Override
    public String getTokenByUserMail(String email) {
        Invitation invitation = invitationRepository.findByEmail(email);
        if (invitation == null) {
            return null;
        }
        return invitation.getToken();
    }

    @Override
    public Boolean deleteToken(String token) {
        Invitation invitation = invitationRepository.findByToken(token);
        if(invitation != null) {
            invitationRepository.delete(invitation);
            return true;
        }
        return false;
    }
}
