package com.mk.ProjectManagementSystem.Service;

import com.mk.ProjectManagementSystem.model.Comment;

import java.util.List;

public interface CommentService {
    Comment createComment(Long issueId,Long userId,String comment);
    Boolean deleteComment(Long userId,Long commentId);
    List<Comment> findCommentByIssueId(Long issueId);
}
