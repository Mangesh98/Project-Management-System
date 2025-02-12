package com.mk.ProjectManagementSystem.Service;

import com.mk.ProjectManagementSystem.model.Issue;
import com.mk.ProjectManagementSystem.model.Project;
import com.mk.ProjectManagementSystem.model.User;
import com.mk.ProjectManagementSystem.repository.IssueRepository;
import com.mk.ProjectManagementSystem.request.IssueRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class IssueServiceImpl implements IssueService {
    private final IssueRepository issueRepository;
    private final ProjectService projectService;
    private final UserService userService;


    public IssueServiceImpl(IssueRepository issueRepository, ProjectService projectService, UserService userService) {
        this.issueRepository = issueRepository;
        this.projectService = projectService;
        this.userService = userService;
    }

    @Override
    public Issue getIssueById(Long issueId) {
      return issueRepository.findById(issueId).orElse(null);
    }

    @Override
    public List<Issue> getIssueByProjectId(Long projectId) {
        return issueRepository.findByProjectID(projectId);
    }

    @Override
    public Issue createIssue(IssueRequest issue, User user) {
       Project project = projectService.getProjectById(issue.getProjectId());
       if (project == null) {
           return null;
       }
       Issue newIssue = new Issue();
       newIssue.setTitle(issue.getTitle());
       newIssue.setDescription(issue.getDescription());
       newIssue.setStatus(issue.getStatus());
       newIssue.setDueDate(issue.getDueDate());
       newIssue.setPriority(issue.getPriority());
       newIssue.setProject(project);
       newIssue.setProjectID(project.getId());
       return issueRepository.save(newIssue);
    }

    @Override
    public Boolean deleteIssue(Long issueId) {
        if(issueRepository.existsById(issueId)) {
            issueRepository.deleteById(issueId);
            return true;
        }
        return false;
    }

    @Override
    public Issue addUserToIssue(Long issueId, Long userId) {
        User user =userService.findUserById(userId);
        Optional<Issue> issue = issueRepository.findById(issueId);
        if(issue.isPresent() && user != null) {
            Issue newIssue = issue.get();
            newIssue.setAssignee(user);
            return issueRepository.save(newIssue);
        }
        return null;
    }

    @Override
    public Issue updateStatus(Long issueId, String status) {
        Issue issue = issueRepository.findById(issueId).orElse(null);
        if(issue != null) {
            issue.setStatus(status);
            return issueRepository.save(issue);
        }
        return null;
    }
}
