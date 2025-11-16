package com.example.backend.service;


import com.example.backend.DTO.HouseholdFootprintDTO;
import com.example.backend.DTO.UpdateHouseholdFootprintDTO;
import com.example.backend.model.HouseholdFootprint;
import com.example.backend.repository.HouseholdFootprintRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;

@Service
public class HouseholdFootprintService     {
    private final HouseholdFootprintRepository householdFootprintRepository;


    @Autowired
    public HouseholdFootprintService(HouseholdFootprintRepository householdFootprintRepository) {
        this.householdFootprintRepository = householdFootprintRepository;
    }

    public HouseholdFootprintDTO findHouseholdFootprintById(Integer id)  {

        HouseholdFootprint footprint = householdFootprintRepository.findHouseholdFootprintById(id);

        return convertHouseholdFootprintToHouseholdFootprintDTO(footprint);
    }

    public HouseholdFootprintDTO updateHouseholdFootprintById(Integer id, UpdateHouseholdFootprintDTO updateDTO) {
        HouseholdFootprint footprint = householdFootprintRepository.findHouseholdFootprintById(id);
        
        if (footprint == null) {
            return null;
        }
        
        footprint.setFootprint(updateDTO.footprint());
        footprint.setDate(Date.valueOf(LocalDate.now()));
        householdFootprintRepository.save(footprint);
        
        return convertHouseholdFootprintToHouseholdFootprintDTO(footprint);
    }

    public HouseholdFootprintDTO convertHouseholdFootprintToHouseholdFootprintDTO(HouseholdFootprint footprint) {
        return new HouseholdFootprintDTO(
                footprint.getId(),
                footprint.getDate(),
                footprint.getFootprint()
        );
    }
}