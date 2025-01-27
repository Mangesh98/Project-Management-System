package com.mk.ProjectManagementSystem.controller;

import com.mk.ProjectManagementSystem.DTO.IssueDTO;
import com.mk.ProjectManagementSystem.Service.IssueService;
import com.mk.ProjectManagementSystem.Service.UserService;
import com.mk.ProjectManagementSystem.model.Issue;
import com.mk.ProjectManagementSystem.model.User;
import com.mk.ProjectManagementSystem.request.IssueRequest;
import com.mk.ProjectManagementSystem.response.MessageResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/issues")
public class IssueController {
    private final IssueService issueService;
    private final UserService userService;


    public IssueController(IssueService issueService, UserService userService) {
        this.issueService = issueService;
        this.userService = userService;
    }
    private Boolean AuthUser(String jwt){
        User user = userService.findUserProfileByJwt(jwt);
        return user != null;
    }

    @GetMapping("/{issueId}")
    public ResponseEntity<Issue> getIssueById(@PathVariable Long issueId, @RequestHeader("Authorization") String jwtToken) {
        if(!AuthUser(jwtToken)){
           return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        Issue issue = issueService.getIssueById(issueId);
        if (issue == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(issue, HttpStatus.OK);
    }

    @GetMapping("/project/{projectId}")
    public ResponseEntity<List<Issue>> getIssuesByProjectId(@PathVariable Long projectId, @RequestHeader("Authorization") String jwtToken) {
        if(!AuthUser(jwtToken)){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        List<Issue> issues = issueService.getIssueByProjectId(projectId);
        if (issues == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(issues, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<IssueDTO> createIssue(@RequestBody IssueRequest issue, @RequestHeader("Authorization") String jwtToken) {
        User tokenUser = userService.findUserProfileByJwt(jwtToken);
        User user = userService.findUserById(tokenUser.getId());
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        Issue newIssue = issueService.createIssue(issue, user);
        IssueDTO issueDTO = new IssueDTO();
        issueDTO.setDescription(issue.getDescription());
        issueDTO.setDueDate(newIssue.getDueDate());
        issueDTO.setId(newIssue.getId());
        issueDTO.setProjectId(newIssue.getProjectID());
        issueDTO.setPriority(newIssue.getPriority());
        issueDTO.setStatus(newIssue.getStatus());
        issueDTO.setTitle(newIssue.getTitle());
        issueDTO.setTags(newIssue.getTags());
        issueDTO.setAssignee(newIssue.getAssignee());
        return new ResponseEntity<>(issueDTO, HttpStatus.CREATED);
    }

    @DeleteMapping("/{issueId}")
    public ResponseEntity<MessageResponse> deleteIssue(@PathVariable Long issueId, @RequestHeader("Authorization") String jwtToken) {
        User tokenUser = userService.findUserProfileByJwt(jwtToken);
        if (tokenUser == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        if (issueService.deleteIssue(issueId)) {
            return new ResponseEntity<>(new MessageResponse("Issue Deleted"), HttpStatus.OK);
        }
        return new ResponseEntity<>(new MessageResponse("Something went wrong !"), HttpStatus.NOT_FOUND);
    }

    @PutMapping("/{issueId}/assignee/{userId}")
    public ResponseEntity<Issue> addUserToIssue(@PathVariable Long issueId, @PathVariable Long userId) {
        Issue updatedIssue = issueService.addUserToIssue(issueId, userId);
        if (updatedIssue == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(updatedIssue, HttpStatus.OK);
    }
    @PutMapping("/{issueId}/status/{status}")
    public ResponseEntity<Issue> updateIssueStatus(@PathVariable Long issueId, @PathVariable String status,@RequestHeader("Authorization") String jwtToken){
        if(!AuthUser(jwtToken)){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        Issue issue=issueService.updateStatus(issueId, status);
        if (issue == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(issue, HttpStatus.OK);
    }
}
