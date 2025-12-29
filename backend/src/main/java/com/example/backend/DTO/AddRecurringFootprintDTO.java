package com.example.backend.DTO;

import com.example.backend.model.FootprintType;

public record AddRecurringFootprintDTO(
        FootprintType footprintType,
        String name,
        Float footprint,
        Float kilometers,  
        String meal       
) {
}

