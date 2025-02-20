package com.mk.ProjectManagementSystem.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Subscription {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private LocalDate SubscriptionStartDate;
    private LocalDate SubscriptionEndDate;
    private PlanType planType;
    private Boolean isValid;
    @OneToOne
    private User user;


}

