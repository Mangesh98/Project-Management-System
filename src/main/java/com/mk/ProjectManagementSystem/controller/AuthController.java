package com.mk.ProjectManagementSystem.controller;

import com.mk.ProjectManagementSystem.Config.JwtProvider;
import com.mk.ProjectManagementSystem.Service.SubscriptionService;
import com.mk.ProjectManagementSystem.model.Subscription;
import com.mk.ProjectManagementSystem.repository.UserRepository;
import com.mk.ProjectManagementSystem.Service.CustomUserDetailsImpl;
import com.mk.ProjectManagementSystem.model.User;
import com.mk.ProjectManagementSystem.request.LoginRequest;
import com.mk.ProjectManagementSystem.response.AuthResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final CustomUserDetailsImpl customUserDetails;
    private final SubscriptionService subscriptionService;

    public AuthController(UserRepository userRepository, PasswordEncoder passwordEncoder, CustomUserDetailsImpl customUserDetails, SubscriptionService subscriptionService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.customUserDetails = customUserDetails;
        this.subscriptionService = subscriptionService;
    }

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> createUserHandler(@RequestBody User user) {
        // Validate request fields
        if (user == null || user.getEmail() == null || user.getEmail().isEmpty() ||
                user.getPassword() == null || user.getPassword().isEmpty() ||
                user.getFullName() == null || user.getFullName().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new AuthResponse(null, "Email, password, and full name must not be empty"));
        }

        // Check if the email is already in use
        if (userRepository.findByEmail(user.getEmail()) != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(new AuthResponse(null, "Email is already associated with another account"));
        }

        try {
            // Create a new user
            User newUser = new User();
            newUser.setEmail(user.getEmail());
            newUser.setPassword(passwordEncoder.encode(user.getPassword()));
            newUser.setFullName(user.getFullName());
            User savedUser=userRepository.save(newUser);

//          Create User Subscription
           Subscription subscription =subscriptionService.createSubscription(savedUser);
            if (subscription == null) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(new AuthResponse(null, "Failed to create subscription"));
            }

            // Automatically log in the user after signup
            Authentication auth = new UsernamePasswordAuthenticationToken(
                    newUser.getEmail(),
                    null,
                    Collections.emptyList()
            );
            String jwt = JwtProvider.generateToken(auth);

            // Return success response
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new AuthResponse(jwt, "Sign up successful"));

        } catch (Exception e) {
            // Log the exception for debugging
            e.printStackTrace(); // Replace with proper logging in production
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new AuthResponse(null, "An unexpected error occurred"));
        }
    }


    @PostMapping("/login")
    public ResponseEntity<AuthResponse> loginHandler(@RequestBody LoginRequest loginRequest) {

        // Validate request body
        if (loginRequest == null ||
                loginRequest.getEmail() == null || loginRequest.getEmail().isEmpty() ||
                loginRequest.getPassword() == null || loginRequest.getPassword().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new AuthResponse(null, "Email and password must be provided"));
        }

        try {
            // Load user details
            UserDetails userDetails = customUserDetails.loadUserByUsername(loginRequest.getEmail());
            if (userDetails == null || !passwordEncoder.matches(loginRequest.getPassword(), userDetails.getPassword())) {
                // Generalize error to avoid exposing sensitive information
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(new AuthResponse(null, "Invalid email or password"));
            }

            // Create authentication and generate JWT
            Authentication auth = new UsernamePasswordAuthenticationToken(
                    userDetails.getUsername(),
                    null,
                    userDetails.getAuthorities()
            );
            String jwt = JwtProvider.generateToken(auth);

            // Return success response
            return ResponseEntity.ok(new AuthResponse(jwt, "Login successful"));

        } catch (Exception e) {
            // Log the exception for debugging
            // Avoid exposing detailed error messages to the client
            e.printStackTrace(); // Replace with a proper logger in production
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new AuthResponse(null, "An unexpected error occurred"));
        }
    }

}
