package com.mk.ProjectManagementSystem.Service;

import com.mk.ProjectManagementSystem.model.User;

public interface UserService {
    User findUserProfileByJwt(String jwt);
    User findUserByEmail(String email);
    User findUserById(Long userId);
    User updateUsersProjectSize(User user,int number);
}
