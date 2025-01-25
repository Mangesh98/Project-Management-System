package com.mk.ProjectManagementSystem.Service;

import com.mk.ProjectManagementSystem.model.Chat;
import com.mk.ProjectManagementSystem.model.Project;
import com.mk.ProjectManagementSystem.model.User;

import java.util.List;

public interface ProjectService {
    Project createProject(Project project,User user);
    List<Project> getProjectsTeam(User user,String category,String tag);
    Project getProjectById(Long projectId);
    Boolean deleteProject(Long projectId);

    Project updateProject(Project updatedProject,Long userId);

    Boolean addUserToProject(Long projectId,Long userId);
    Boolean removeUserFromProject(Long projectId,Long userId);
    Chat getChatByProjectId(Long projectId);

    List<Project> searchProjects(String searchText,User user);


}
