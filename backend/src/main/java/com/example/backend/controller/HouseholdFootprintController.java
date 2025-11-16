package com.example.backend.controller;

import com.example.backend.DTO.HouseholdFootprintDTO;
import com.example.backend.DTO.TransportFootprintDTO;
import com.example.backend.DTO.UpdateHouseholdFootprintDTO;
import com.example.backend.security.services.UserDetailsImpl;
import com.example.backend.service.HouseholdFootprintService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static com.example.backend.security.Utils.GetCurrentUser;

@RestController
@CrossOrigin
@RequestMapping(value = "household")
public class HouseholdFootprintController {

    private HouseholdFootprintService householdFootprintService;

    public HouseholdFootprintController(HouseholdFootprintService householdFootprintService) {
        this.householdFootprintService = householdFootprintService;
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping(path="/get")
    public ResponseEntity<HouseholdFootprintDTO> getHousehold() {
        UserDetailsImpl user = GetCurrentUser();
        return ResponseEntity.ok(householdFootprintService.findHouseholdFootprintById(user.getId()));
    }

    @PreAuthorize("hasRole('USER')")
    @PatchMapping(path="/update")
    public ResponseEntity<HouseholdFootprintDTO> updateHouseholdFootprint(@RequestBody UpdateHouseholdFootprintDTO updateDTO) {
        UserDetailsImpl user = GetCurrentUser();
        return ResponseEntity.ok(householdFootprintService.updateHouseholdFootprintById(user.getId(), updateDTO));
    }
}
