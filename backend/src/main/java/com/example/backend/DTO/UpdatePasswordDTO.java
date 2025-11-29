package com.example.backend.DTO;

public record UpdatePasswordDTO(
        Integer userId,
        String currentPassword,
        String newPassword
) {

}

