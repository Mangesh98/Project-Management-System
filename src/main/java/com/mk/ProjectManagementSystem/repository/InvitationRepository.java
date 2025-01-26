package com.mk.ProjectManagementSystem.repository;

import com.mk.ProjectManagementSystem.model.Invitation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InvitationRepository extends JpaRepository<Invitation, Long> {
    Invitation findByToken(String token);
    Invitation findByEmail(String email);
}
