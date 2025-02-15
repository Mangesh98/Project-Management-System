package com.mk.ProjectManagementSystem.controller;

import com.mk.ProjectManagementSystem.Service.SubscriptionService;
import com.mk.ProjectManagementSystem.Service.UserService;
import com.mk.ProjectManagementSystem.model.PlanType;
import com.mk.ProjectManagementSystem.model.Subscription;
import com.mk.ProjectManagementSystem.model.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/subscription")
public class SubscriptionController {
    private final SubscriptionService subscriptionService;
    private final UserService userService;

    public SubscriptionController(SubscriptionService subscriptionService, UserService userService) {
        this.subscriptionService = subscriptionService;
        this.userService = userService;
    }

    @GetMapping("/user")
    public ResponseEntity<Subscription> getSubscriptions(@RequestHeader("Authorization") String jwtToken) {
        System.out.println("jwtToken : "+jwtToken);
        User user = userService.findUserProfileByJwt(jwtToken);
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        Subscription subscriptions = subscriptionService.getUsersSubscription(user.getId());
        if (subscriptions == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(subscriptions, HttpStatus.OK);
    }

    @PatchMapping("/upgrade")
    public ResponseEntity<Subscription> upgradeSubscription(@RequestParam PlanType planType, @RequestHeader("Authorization") String jwtToken) {
        User user = userService.findUserProfileByJwt(jwtToken);
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        Subscription subscriptions = subscriptionService.updateSubscription(user.getId(), planType);
        if (subscriptions == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(subscriptions, HttpStatus.OK);
    }

}
