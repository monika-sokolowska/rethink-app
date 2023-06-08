package com.example.backend.controller;

import com.example.backend.DTO.DailyStatsDTO;
import com.example.backend.DTO.TransportFootprintDTO;
import com.example.backend.security.services.UserDetailsImpl;
import com.example.backend.service.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
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


    @PreAuthorize("hasRole('USER')")
    @GetMapping(path="/daily")
    public ResponseEntity<DailyStatsDTO> getDailyStats() {


        UserDetailsImpl user = GetCurrentUser();
        return ResponseEntity.ok(statsService.getDailyStatsByID(user.getId()));
    }

}
