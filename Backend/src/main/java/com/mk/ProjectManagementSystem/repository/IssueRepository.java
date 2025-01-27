package com.mk.ProjectManagementSystem.repository;

import com.mk.ProjectManagementSystem.model.Issue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IssueRepository extends JpaRepository<Issue, Long> {
    List<Issue> findByProjectID(Long projectID);
}