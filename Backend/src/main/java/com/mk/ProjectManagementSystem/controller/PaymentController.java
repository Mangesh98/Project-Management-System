package com.mk.ProjectManagementSystem.controller;

import com.mk.ProjectManagementSystem.Service.UserService;
import com.mk.ProjectManagementSystem.model.PlanType;
import com.mk.ProjectManagementSystem.model.User;
import com.mk.ProjectManagementSystem.response.PaymentLinkResponse;
import com.razorpay.PaymentLink;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {
    @Value("${FRONTEND_URL}")
    private String FRONTEND_URL;
    @Value("${razorpay.api.key}")
    private String apiKey;
    @Value("${razorpay.api.secret}")
    private String apiSecret;

    private final UserService userService;

    public PaymentController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/{planType}")
    public ResponseEntity<PaymentLinkResponse> createPaymentLink(@PathVariable PlanType planType, @RequestHeader("Authorization") String jwtToken) {
        User user = userService.findUserProfileByJwt(jwtToken);
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        int amount = 799 * 100;
        if (planType.equals(PlanType.ANNUALLY)) {
            amount = amount * 12;
            amount = (int) (amount * 0.7);
        }
        int maxRetries = 3;
        int retryCount = 0;

        while (retryCount < maxRetries) {
            try {
                RazorpayClient razorpay = new RazorpayClient(apiKey, apiSecret);
                JSONObject paymentLinkRequest = getJsonObject(planType, amount, user);
                PaymentLink payment = razorpay.paymentLink.create(paymentLinkRequest);
                String paymentLinkId = payment.get("id");
                String paymentLinkUrl = payment.get("short_url");
                return new ResponseEntity<>(new PaymentLinkResponse(paymentLinkId, paymentLinkUrl), HttpStatus.CREATED);

            } catch (RazorpayException e) {
                retryCount++;

                e.printStackTrace();
                if (retryCount == maxRetries) {
                    e.printStackTrace();
                    return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
                }

            }
        }
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

private JSONObject getJsonObject(PlanType planType, int amount, User user) {
    JSONObject paymentLinkRequest = new JSONObject();

    // Create customer object
    JSONObject customer = new JSONObject();
    customer.put("name", user.getFullName());
    customer.put("email", user.getEmail());
    // Either get phone from user object if you have it stored

    // Create notification object
    JSONObject notify = new JSONObject();
    notify.put("email", true);

    // Create notes object
    JSONObject notes = new JSONObject();
    notes.put("plan_type", planType.toString());

    // Main payment link request
    paymentLinkRequest.put("amount", amount);
    paymentLinkRequest.put("currency", "INR");
    paymentLinkRequest.put("accept_partial", false);
    paymentLinkRequest.put("customer", customer);
    paymentLinkRequest.put("notify", notify);
    paymentLinkRequest.put("notes", notes);
    paymentLinkRequest.put("callback_url", FRONTEND_URL + "/upgrade_plan/success/?planType=" + planType);
    paymentLinkRequest.put("callback_method", "get");

    return paymentLinkRequest;
}
}
