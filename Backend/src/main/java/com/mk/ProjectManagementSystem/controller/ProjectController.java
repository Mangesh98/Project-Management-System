package com.mk.ProjectManagementSystem.controller;

import com.mk.ProjectManagementSystem.Service.InvitationService;
import com.mk.ProjectManagementSystem.Service.ProjectService;
import com.mk.ProjectManagementSystem.Service.UserService;
import com.mk.ProjectManagementSystem.model.Chat;
import com.mk.ProjectManagementSystem.model.Invitation;
import com.mk.ProjectManagementSystem.model.Project;
import com.mk.ProjectManagementSystem.model.User;
import com.mk.ProjectManagementSystem.request.InviteRequest;
import com.mk.ProjectManagementSystem.response.MessageResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {
    private final ProjectService projectService;
    private final UserService userService;
    private final InvitationService invitationService;

    public ProjectController(ProjectService projectService, UserService userService, InvitationService invitationService) {
        this.projectService = projectService;
        this.userService = userService;
        this.invitationService = invitationService;
    }

    private User AuthUser(String jwt) {
        return userService.findUserProfileByJwt(jwt);
    }

    @GetMapping
    public ResponseEntity<List<Project>> getAllProjects(@RequestParam(required = false) String category,
                                                        @RequestParam(required = false) String tag,
                                                        @RequestHeader("Authorization") String jwt
    ) {
        User user = userService.findUserProfileByJwt(jwt);
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        List<Project> projects = projectService.getProjectsTeam(user, category, tag);
        return new ResponseEntity<>(projects, HttpStatus.OK);
    }

    @GetMapping("/{projectId}")
    public ResponseEntity<Project> getProjectById(@PathVariable Long projectId, @RequestHeader("Authorization") String jwt) {
        if (AuthUser(jwt) == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        Project project = projectService.getProjectById(projectId);
        if (project == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(project, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Project> createProject(@RequestBody Project project, @RequestHeader("Authorization") String jwt) {
        User user = AuthUser(jwt);
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        Project createdProject = projectService.createProject(project, user);
        return new ResponseEntity<>(createdProject, HttpStatus.CREATED);
    }

    @PatchMapping("/{projectId}")
    public ResponseEntity<Project> updateProject(@PathVariable Long projectId, @RequestBody Project project, @RequestHeader("Authorization") String jwt) {
        User user = AuthUser(jwt);
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        Project project1 = projectService.getProjectById(projectId);
        if (project1 == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        Project updatedProject = projectService.updateProject(project, user.getId());
        if (updatedProject == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(updatedProject, HttpStatus.OK);
    }

    @DeleteMapping("/{ProjectId}")
    public ResponseEntity<MessageResponse> deleteProject(@PathVariable Long ProjectId, @RequestHeader("Authorization") String jwt) {
        if (AuthUser(jwt) == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        MessageResponse messageResponse = new MessageResponse("Project deleted successfully");

        if (projectService.deleteProject(ProjectId)) {
            return new ResponseEntity<>(messageResponse, HttpStatus.OK);
        }
        messageResponse.setMessage("Something Went wrong !");
        return new ResponseEntity<>(messageResponse, HttpStatus.NOT_FOUND);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Project>> searchProjects(
            @RequestParam(required = false) String keyword,
            @RequestHeader("Authorization") String jwt
    ) {
        User user = AuthUser(jwt);
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        List<Project> projects = projectService.searchProjects(keyword, user);
        return new ResponseEntity<>(projects, HttpStatus.OK);
    }

    @GetMapping("/{projectId}/chat")
    public ResponseEntity<Chat> getChatByProjectId(@PathVariable Long projectId, @RequestHeader("Authorization") String jwt) {

        if (AuthUser(jwt) == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        Chat chat = projectService.getChatByProjectId(projectId);
        if (chat == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(chat, HttpStatus.OK);
    }

    @PostMapping("/invite")
    public ResponseEntity<MessageResponse> inviteProject(
            @RequestBody InviteRequest request,
           @RequestHeader("Authorization") String jwt) {

        if (AuthUser(jwt) == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        try {
        Boolean invitationStatus = invitationService.sendInvitation(request.getEmail(), request.getProjectId());
        if (!invitationStatus) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(new MessageResponse("Invitation sent successfully"), HttpStatus.OK);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
    @GetMapping("/accept_invitation")
    public ResponseEntity<Invitation> acceptInvitation(@RequestParam String token, @RequestHeader("Authorization") String jwt) {
        User user = AuthUser(jwt);
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        Invitation invitation = invitationService.acceptInvitation(token, user.getId());
        if (invitation == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        boolean addUserToProject=projectService.addUserToProject(invitation.getProjectId(), user.getId());
        if(!addUserToProject){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(invitation, HttpStatus.OK);
    }

}
