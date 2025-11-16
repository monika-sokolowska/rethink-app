package com.example.backend.security;

import com.example.backend.model.User;
import com.example.backend.security.services.UserDetailsImpl;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetails;

public class Utils {
    public static UserDetailsImpl GetCurrentUser() {
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || authentication.getPrincipal() == null) {
            throw new RuntimeException("User not authenticated");
        }
        return (UserDetailsImpl) authentication.getPrincipal();
    }
}