package com.mk.ProjectManagementSystem.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

//@Data
//@AllArgsConstructor
//@NoArgsConstructor
public class CreateMessageRequest {
    private Long senderID;
    private Long projectID;
    private String content;

    public Long getSenderID() {
        return senderID;
    }

    public void setSenderID(Long senderID) {
        this.senderID = senderID;
    }

    public Long getProjectID() {
        return projectID;
    }

    public void setProjectID(Long projectID) {
        this.projectID = projectID;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public CreateMessageRequest(Long senderID, Long projectID, String content) {
        this.senderID = senderID;
        this.projectID = projectID;
        this.content = content;
    }

    public CreateMessageRequest() {
    }
}
