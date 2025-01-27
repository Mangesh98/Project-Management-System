package com.mk.ProjectManagementSystem.Service;

import com.mk.ProjectManagementSystem.model.PlanType;
import com.mk.ProjectManagementSystem.model.Subscription;
import com.mk.ProjectManagementSystem.model.User;
import com.mk.ProjectManagementSystem.repository.SubscriptionRepository;
import com.mk.ProjectManagementSystem.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class SubscriptionServiceImpl implements SubscriptionService {
    private final SubscriptionRepository subscriptionRepository;
    private final UserRepository userRepository;

    public SubscriptionServiceImpl(SubscriptionRepository subscriptionRepository, UserRepository userRepository) {
        this.subscriptionRepository = subscriptionRepository;
        this.userRepository = userRepository;
    }

    @Override
    public Subscription createSubscription(User user) {
        User subscriptionUser = userRepository.findByEmail(user.getEmail());
        if (subscriptionUser == null) {
            return null;
        }
        Subscription subscription = new Subscription();
        subscription.setUser(user);
        subscription.setPlanType(PlanType.FREE);
        subscription.setSubscriptionStartDate(LocalDate.now());
        subscription.setSubscriptionEndDate(LocalDate.now().plusMonths(12));
        subscription.setIsValid(true);
        return subscriptionRepository.save(subscription);
    }

    @Override
    public Subscription getUsersSubscription(Long userId) {
        Subscription subscription = subscriptionRepository.findByUserId(userId);
        if (subscription == null) {
            return null;
        }
        if(!isValid(subscription)){
            subscription.setPlanType(PlanType.FREE);
            subscription.setSubscriptionStartDate(LocalDate.now());
            subscription.setSubscriptionEndDate(LocalDate.now().plusMonths(12));
        }
        return subscriptionRepository.save(subscription);
    }

    @Override
    public Subscription updateSubscription(Long userId, PlanType planType) {
        Subscription subscription = getUsersSubscription(userId);
        if (subscription == null) {
            return null;
        }
        subscription.setPlanType(planType);
        subscription.setSubscriptionStartDate(LocalDate.now());
        if(planType == PlanType.ANNUALLY) {
            subscription.setSubscriptionEndDate(LocalDate.now().plusMonths(12));
        }else {
            subscription.setSubscriptionEndDate(LocalDate.now().plusMonths(1));
        }
        return subscriptionRepository.save(subscription);
    }

    @Override
    public Boolean isValid(Subscription subscription) {
        if (subscription == null) {
            return false;
        }
        if(subscription.getPlanType() == PlanType.FREE) {
            return true;
        }
        LocalDate endDate = subscription.getSubscriptionStartDate();
        LocalDate currentDate = LocalDate.now();

        return endDate.isEqual(currentDate) || endDate.isAfter(currentDate);
    }
}
