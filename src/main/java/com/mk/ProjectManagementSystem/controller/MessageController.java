package com.mk.ProjectManagementSystem.controller;

import com.mk.ProjectManagementSystem.Service.MessageService;
import com.mk.ProjectManagementSystem.Service.ProjectService;
import com.mk.ProjectManagementSystem.Service.UserService;
import com.mk.ProjectManagementSystem.model.Chat;
import com.mk.ProjectManagementSystem.model.Message;
import com.mk.ProjectManagementSystem.model.User;
import com.mk.ProjectManagementSystem.request.CreateMessageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
public class MessageController {
    private final MessageService messageService;
    private final UserService userService;
    private final ProjectService projectService;

    public MessageController(MessageService messageService, UserService userService, ProjectService projectService) {
        this.messageService = messageService;
        this.userService = userService;
        this.projectService = projectService;
    }

    private Boolean AuthUser(String jwt) {
        User user = userService.findUserProfileByJwt(jwt);
        return user != null;
    }

    @PostMapping("/send")
    public ResponseEntity<Message> sendMessage(@RequestBody CreateMessageRequest request, @RequestHeader("Authorization") String jwtToken) {
        User user = userService.findUserProfileByJwt(jwtToken);
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        Chat chats = projectService.getProjectById(request.getProjectID()).getChat();
        if (chats == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Message sendMessage = messageService.sendMessage(
                request.getSenderID(), request.getProjectID(), request.getContent()
        );
        if (sendMessage == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(sendMessage, HttpStatus.OK);
    }

    @GetMapping("/chat/{projectId}")
    public ResponseEntity<List<Message>> getMessagesByChatId(@PathVariable("projectId") Long projectId, @RequestHeader("Authorization") String jwtToken) {
        if (!AuthUser(jwtToken)) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        List<Message> messages = messageService.getMessagesByProjectId(projectId);
        if (messages == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(messages, HttpStatus.OK);
    }
}
