package com.mk.ProjectManagementSystem.Service;

import com.mk.ProjectManagementSystem.model.Chat;
import com.mk.ProjectManagementSystem.model.Project;
import com.mk.ProjectManagementSystem.model.User;
import com.mk.ProjectManagementSystem.repository.ProjectRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;
    private final UserService userService;
    private final ChatService chatService;

    public ProjectServiceImpl(ProjectRepository projectRepository, UserService userService, ChatService chatService) {
        this.projectRepository = projectRepository;
        this.userService = userService;
        this.chatService = chatService;
    }

    @Override
    public Project createProject(Project project, User user) {
        Project newProject = new Project();
        newProject.setName(project.getName());
        newProject.setDescription(project.getDescription());
        newProject.setCategory(project.getCategory());
        newProject.setTags(project.getTags());
        newProject.getTeam().add(user);
        Project savedProject = projectRepository.save(newProject);
        Chat chat = new Chat();
        chat.setProject(savedProject);
        Chat ProjectChat = chatService.createChat(chat);
        newProject.setChat(ProjectChat);
        return newProject;
    }

    @Override
    public List<Project> getProjectsTeam(User user, String category, String tag) {
        List<Project> projects = projectRepository.findByTeamContainingOrOwner(user, user);
        if (category != null && !category.isEmpty()) {
            projects = projects.stream().filter(p -> p.getCategory().equals(category)).toList();
        }
        if (tag != null && !tag.isEmpty()) {
            projects = projects.stream().filter(p -> p.getTags().contains(tag)).toList();
        }
        return projects;
    }

    @Override
    public Project getProjectById(Long projectId) {
        return projectRepository.findById(projectId).orElse(null);
    }

    @Override
    public Boolean deleteProject(Long projectId) {
        Project project = projectRepository.findById(projectId).orElse(null);
        if (project != null) {
            projectRepository.deleteById(projectId);
            return true;
        }
        return false;

    }

    @Override
    public Boolean addUserToProject(Long projectId, Long userId) {
        Project project = projectRepository.findById(projectId).orElse(null);
        User user= userService.findUserById(userId);
        if (project == null || user == null || project.getTeam().contains(user)) {
            return false;
        }
        project.getChat().getUsers().add(user);
        project.getTeam().add(user);
        projectRepository.save(project);
        return true;
    }

    @Override
    public Boolean removeUserFromProject(Long projectId, Long userId) {
        Project project = projectRepository.findById(projectId).orElse(null);
        User user = userService.findUserById(userId);
        if (project == null || user == null || project.getTeam().contains(user)) {
            return false;
        }
        project.getChat().getUsers().remove(user);
        project.getTeam().remove(user);
        projectRepository.save(project);
        return true;
    }

    @Override
    public Project updateProject(Project updatedProject, Long userId) {
        Project project = projectRepository.findById(updatedProject.getId()).orElse(null);
        if (project != null) {
            project.setName(updatedProject.getName());
            project.setDescription(updatedProject.getDescription());
            project.setCategory(updatedProject.getCategory());
            project.setTags(updatedProject.getTags());
            return projectRepository.save(project);
        }
        return null;
    }


    @Override
    public Chat getChatByProjectId(Long projectId) {
        Project project = projectRepository.findById(projectId).orElse(null);
        if (project != null) {
            return project.getChat();
        }

        return null;
    }

    @Override
    public List<Project> searchProjects(String searchText, User user) {
        return projectRepository.findByNameContainingAndTeamContains(searchText, user);
    }
}
