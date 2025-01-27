package com.mk.ProjectManagementSystem.Service;

import com.mk.ProjectManagementSystem.model.Issue;
import com.mk.ProjectManagementSystem.model.User;
import com.mk.ProjectManagementSystem.request.IssueRequest;

import java.util.List;

public interface IssueService {
    Issue getIssueById(Long issueId);

    List<Issue> getIssueByProjectId(Long projectId);

    Issue createIssue(IssueRequest issue, User user);

    Boolean deleteIssue(Long issueId);

    Issue addUserToIssue(Long issueId, Long userId);

    Issue updateStatus(Long issueId, String status);
}
