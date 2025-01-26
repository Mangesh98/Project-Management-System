package com.mk.ProjectManagementSystem.Service;

import com.mk.ProjectManagementSystem.model.PlanType;
import com.mk.ProjectManagementSystem.model.Subscription;
import com.mk.ProjectManagementSystem.model.User;

public interface SubscriptionService {
    Subscription createSubscription(User user);
    Subscription getUsersSubscription(Long userId);
    Subscription updateSubscription(Long userId, PlanType planType);
    Boolean isValid(Subscription subscription);
}
