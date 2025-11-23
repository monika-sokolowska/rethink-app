package com.example.backend.controller;

import com.example.backend.DTO.AveragePersonDTO;
import com.example.backend.DTO.DailyStatsDTO;
import com.example.backend.DTO.TransportFootprintDTO;
import com.example.backend.DTO.UpdateAverageDailyFootprintDTO;
import com.example.backend.DTO.UpdateAverageHouseholdFootprintDTO;
import com.example.backend.security.services.UserDetailsImpl;
import com.example.backend.service.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static com.example.backend.security.Utils.GetCurrentUser;

@RestController
@CrossOrigin
@RequestMapping(value = "stats")
public class StatsController {

    private StatsService statsService;

    public StatsController(StatsService statsService) {


        this.statsService = statsService;
    }


    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    @GetMapping(path="/daily")
    public ResponseEntity<DailyStatsDTO> getDailyStats() {


        UserDetailsImpl user = GetCurrentUser();
        return ResponseEntity.ok(statsService.getDailyStatsByID(user.getId()));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping(path="/average-daily-footprint")
    public ResponseEntity<AveragePersonDTO> updateAverageDailyFootprint(
            @RequestBody UpdateAverageDailyFootprintDTO updateDTO) {
        return ResponseEntity.ok(statsService.updateAverageDailyFootprint(updateDTO));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping(path="/average-household-footprint")
    public ResponseEntity<AveragePersonDTO> updateAverageHouseholdFootprint(
            @RequestBody UpdateAverageHouseholdFootprintDTO updateDTO) {
        return ResponseEntity.ok(statsService.updateAverageHouseholdFootprint(updateDTO));
    }

    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    @GetMapping(path="/average-person")
    public ResponseEntity<AveragePersonDTO> getAveragePerson() {
        return ResponseEntity.ok(statsService.getAveragePerson());
    }

}
