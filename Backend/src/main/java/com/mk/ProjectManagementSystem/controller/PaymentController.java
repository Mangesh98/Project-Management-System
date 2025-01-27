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
        try{
            RazorpayClient razorpay = new RazorpayClient(apiKey,apiSecret);

            JSONObject customer = new JSONObject();
            customer.put("name",user.getFullName());
            customer.put("email",user.getEmail());

            JSONObject notify = new JSONObject();
            notify.put("email",true);

            JSONObject paymentLinkRequest = new JSONObject();
            paymentLinkRequest.put("amount",amount);
            paymentLinkRequest.put("currency","INR");
            paymentLinkRequest.put("customer",customer);
            paymentLinkRequest.put("notify",notify);
            FRONTEND_URL=FRONTEND_URL+"/upgrade_plan?planType"+planType;
            paymentLinkRequest.put("callback",FRONTEND_URL);

            PaymentLink payment=razorpay.paymentLink.create(paymentLinkRequest);
            String paymentLinkId=payment.get("id");
            String paymentLinkUrl=payment.get("short_url");
            PaymentLinkResponse paymentLinkResponse=new PaymentLinkResponse(paymentLinkId,paymentLinkUrl);
            return new ResponseEntity<>(paymentLinkResponse,HttpStatus.CREATED);
        } catch (RazorpayException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
