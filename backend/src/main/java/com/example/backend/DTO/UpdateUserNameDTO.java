package com.example.backend.DTO;

public record UpdateUserNameDTO(
        Integer userId,
        String name,
        String lastName
) {

}

