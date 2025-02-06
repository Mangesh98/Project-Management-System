package com.mk.ProjectManagementSystem.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
//@Data
//@NoArgsConstructor
//@AllArgsConstructor
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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getSubscriptionStartDate() {
        return SubscriptionStartDate;
    }

    public void setSubscriptionStartDate(LocalDate subscriptionStartDate) {
        SubscriptionStartDate = subscriptionStartDate;
    }

    public LocalDate getSubscriptionEndDate() {
        return SubscriptionEndDate;
    }

    public void setSubscriptionEndDate(LocalDate subscriptionEndDate) {
        SubscriptionEndDate = subscriptionEndDate;
    }

    public PlanType getPlanType() {
        return planType;
    }

    public void setPlanType(PlanType planType) {
        this.planType = planType;
    }

    public Boolean getValid() {
        return isValid;
    }

    public void setIsValid(Boolean valid) {
        isValid = valid;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Subscription(Long id, LocalDate subscriptionStartDate, LocalDate subscriptionEndDate, PlanType planType, Boolean isValid, User user) {
        this.id = id;
        SubscriptionStartDate = subscriptionStartDate;
        SubscriptionEndDate = subscriptionEndDate;
        this.planType = planType;
        this.isValid = isValid;
        this.user = user;
    }

    public Subscription() {
    }
}

