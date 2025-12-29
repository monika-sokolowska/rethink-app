package com.example.backend.controller;

import com.example.backend.DTO.AddRecurringFootprintDTO;
import com.example.backend.DTO.DeleteDTO;
import com.example.backend.DTO.RecurringFootprintDTO;
import com.example.backend.security.services.UserDetailsImpl;
import com.example.backend.service.RecurringFootprintService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.example.backend.security.Utils.GetCurrentUser;

@RestController
@CrossOrigin
@RequestMapping(value = "footprint/recurring")
public class RecurringFootprintController {

    private final RecurringFootprintService recurringFootprintService;

    public RecurringFootprintController(RecurringFootprintService recurringFootprintService) {
        this.recurringFootprintService = recurringFootprintService;
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping
    public ResponseEntity<List<RecurringFootprintDTO>> getRecurringFootprints() {
        UserDetailsImpl user = GetCurrentUser();
        return ResponseEntity.ok(recurringFootprintService.findAllByUserId(user.getId()));
    }

  
    @PreAuthorize("hasRole('USER')")
    @PostMapping
    public ResponseEntity<RecurringFootprintDTO> addRecurringFootprint(
            @RequestBody AddRecurringFootprintDTO addRecurringFootprintDTO) {
        UserDetailsImpl user = GetCurrentUser();
        return ResponseEntity.ok(
                recurringFootprintService.addRecurringFootprint(user.getId(), addRecurringFootprintDTO));
    }

    @PreAuthorize("hasRole('USER')")
    @DeleteMapping
    public ResponseEntity<RecurringFootprintDTO> deleteRecurringFootprint(@RequestBody DeleteDTO deleteDTO) {
        UserDetailsImpl user = GetCurrentUser();
        return ResponseEntity.ok(
                recurringFootprintService.deleteRecurringFootprint(user.getId(), deleteDTO.id()));
    }


    @PreAuthorize("hasRole('USER')")
    @PatchMapping(path = "/{id}/toggle")
    public ResponseEntity<RecurringFootprintDTO> toggleRecurringFootprint(@PathVariable Integer id) {
        UserDetailsImpl user = GetCurrentUser();
        return ResponseEntity.ok(
                recurringFootprintService.toggleRecurringFootprint(user.getId(), id));
    }
}

