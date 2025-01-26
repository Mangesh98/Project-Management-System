package com.mk.ProjectManagementSystem.Config;

import org.springframework.beans.factory.annotation.Value;

public class JwtConstant {
    @Value("${JWT_SECRET}")
    public static final String JWT_SECRET = "";
    public static final String JWT_HEADER="Authorization";
}
