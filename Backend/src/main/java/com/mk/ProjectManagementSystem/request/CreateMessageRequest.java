package com.mk.ProjectManagementSystem.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateMessageRequest {
    private Long senderID;
    private Long projectID;
    private String content;
}
