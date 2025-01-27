package com.mk.ProjectManagementSystem.Service;

import com.mk.ProjectManagementSystem.model.Message;

import java.util.List;

public interface MessageService {
    Message sendMessage(Long senderId,Long chatId,String content);
    List<Message> getMessagesByProjectId(Long projectId);
}
