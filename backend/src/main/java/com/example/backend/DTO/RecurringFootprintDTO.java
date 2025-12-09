package com.example.backend.DTO;

import com.example.backend.model.FootprintType;

import java.time.LocalDateTime;

public record RecurringFootprintDTO(
        Integer id,
        FootprintType footprintType,
        String name,
        Float footprint,
        Float kilometers,
        String meal,
        Boolean isActive,
        LocalDateTime createdAt
) {
}

