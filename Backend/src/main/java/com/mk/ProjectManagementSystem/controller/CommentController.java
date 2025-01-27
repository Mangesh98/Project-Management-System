package com.mk.ProjectManagementSystem.controller;

import com.mk.ProjectManagementSystem.Service.CommentService;
import com.mk.ProjectManagementSystem.Service.UserService;
import com.mk.ProjectManagementSystem.model.Comment;
import com.mk.ProjectManagementSystem.model.User;
import com.mk.ProjectManagementSystem.request.CreateCommentRequest;
import com.mk.ProjectManagementSystem.response.MessageResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/comments")
public class CommentController {
    private final CommentService commentService;
    private final UserService userService;

    public CommentController(CommentService commentService, UserService userService) {
        this.commentService = commentService;
        this.userService = userService;
    }

    private User AuthUser(String jwt) {
        return userService.findUserProfileByJwt(jwt);
    }

    @PostMapping
    public ResponseEntity<Comment> addComment(@RequestBody CreateCommentRequest request, @RequestHeader("Authorization") String jwtToken) {
        User user = AuthUser(jwtToken);
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        Comment comment = commentService.createComment(request.getIssueId(), user.getId(), request.getContent());
        if (comment == null) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(comment, HttpStatus.CREATED);
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<MessageResponse> deleteComment(@PathVariable("commentId") Long commentId, @RequestHeader("Authorization") String jwtToken) {
        User user = AuthUser(jwtToken);
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        if (commentService.deleteComment(user.getId(), commentId)) {
            return new ResponseEntity<>(new MessageResponse("Comment Deleted Successfully "), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @GetMapping("/{issueId}")
    public ResponseEntity<List<Comment>> getCommentsByIssueId(@PathVariable Long issueId, @RequestHeader("Authorization") String jwtToken) {
        User user = AuthUser(jwtToken);
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>(commentService.findCommentByIssueId(issueId), HttpStatus.OK);
    }
}
