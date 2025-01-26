package com.mk.ProjectManagementSystem.DTO;

import com.mk.ProjectManagementSystem.model.Project;
import com.mk.ProjectManagementSystem.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class IssueDTO {
    private Long id;
    private String title;
    private String description;
    private String status;
    private String priority;
    private Long projectId;
    private LocalDate dueDate;
    private List<String> tags = new ArrayList<>();
    private Project project;
    private User assignee;

}
