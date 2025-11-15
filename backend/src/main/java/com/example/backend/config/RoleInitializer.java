package com.example.backend.config;

import com.example.backend.model.ERole;
import com.example.backend.model.Role;
import com.example.backend.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;

@Component
public class RoleInitializer {

    @Autowired
    private RoleRepository roleRepository;

    @PostConstruct
    public void init() {
        if (roleRepository.findByName(ERole.ROLE_USER) == null) {
            roleRepository.save(new Role(ERole.ROLE_USER));
        }

        if (roleRepository.findByName(ERole.ROLE_ADMIN) == null) {
            roleRepository.save(new Role(ERole.ROLE_ADMIN));
        }
    }
}
