package com.mk.ProjectManagementSystem.Service;

import com.mk.ProjectManagementSystem.model.Chat;
import com.mk.ProjectManagementSystem.model.Message;
import com.mk.ProjectManagementSystem.model.User;
import com.mk.ProjectManagementSystem.repository.MessageRepository;
import com.mk.ProjectManagementSystem.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class MessageServiceImpl implements MessageService {

    private final MessageRepository messageRepository;
    private final UserRepository userRepository;
    private final ProjectService projectService;

    public MessageServiceImpl(MessageRepository messageRepository, UserRepository userRepository, ProjectService projectService) {
        this.messageRepository = messageRepository;
        this.userRepository = userRepository;
        this.projectService = projectService;
    }

    @Override
    public Message sendMessage(Long senderId, Long chatId, String content) {
        Optional<User> user = userRepository.findById(senderId);
        Chat chat = projectService.getChatByProjectId(chatId);
        if (user.isEmpty() || chat == null) {
            return null;
        }
        Message message = new Message();
        message.setSender(user.get());
        message.setChat(chat);
        message.setContent(content);
        message.setCreatedAt(LocalDateTime.now());
        Message savedMessage = messageRepository.save(message);
        chat.getMessages().add(savedMessage);
        return savedMessage;
    }

    @Override
    public List<Message> getMessagesByProjectId(Long projectId) {
        Chat chat = projectService.getChatByProjectId(projectId);
        if (chat == null) {
            return null;
        }
        return messageRepository.findByChatIdOrderByCreatedAtAsc(chat.getId());
    }
}
