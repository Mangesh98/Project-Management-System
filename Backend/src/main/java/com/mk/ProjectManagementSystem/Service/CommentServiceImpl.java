package com.mk.ProjectManagementSystem.Service;

import com.mk.ProjectManagementSystem.model.Comment;
import com.mk.ProjectManagementSystem.model.Issue;
import com.mk.ProjectManagementSystem.model.User;
import com.mk.ProjectManagementSystem.repository.CommentRepository;
import com.mk.ProjectManagementSystem.repository.IssueRepository;
import com.mk.ProjectManagementSystem.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final IssueRepository issueRepository;

    public CommentServiceImpl(CommentRepository commentRepository, UserRepository userRepository, IssueRepository issueRepository) {
        this.commentRepository = commentRepository;
        this.userRepository = userRepository;
        this.issueRepository = issueRepository;
    }

    @Override
    public Comment createComment(Long issueId, Long userId, String comment) {
        Optional<Issue> issue = issueRepository.findById(issueId);
        Optional<User> user = userRepository.findById(userId);
        if (issue.isPresent() && user.isPresent()) {
            Issue issueObj = issue.get();
            User userObj = user.get();
            Comment commentObj = new Comment();
            commentObj.setIssue(issueObj);
            commentObj.setUser(userObj);
            commentObj.setCreatedDateTime(LocalDateTime.now());
            commentObj.setContent(comment);
            Comment savedComment = commentRepository.save(commentObj);
            issueObj.getComments().add(savedComment);
            return savedComment;
        }
        return null;
    }

    @Override
    public Boolean deleteComment(Long userId, Long commentId) {
        Optional<Comment> comment = commentRepository.findById(commentId);
        Optional<User> user = userRepository.findById(userId);
        if (comment.isPresent() && user.isPresent()) {
            Comment commentObj = comment.get();
            User userObj = user.get();
            if (commentObj.getUser().equals(userObj)) {
                commentRepository.delete(commentObj);
                return true;
            }
        }
        return false;
    }

    @Override
    public List<Comment> findCommentByIssueId(Long issueId) {
        return commentRepository.findByIssueId(issueId);
    }
}
