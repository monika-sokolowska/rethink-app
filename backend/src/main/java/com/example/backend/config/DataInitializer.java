package com.example.backend.config;

import com.example.backend.model.AveragePerson;
import com.example.backend.repository.AveragePersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;

@Component
public class DataInitializer {

    @Autowired
    private AveragePersonRepository averagePersonRepository;

    @PostConstruct
    public void init() {
        AveragePerson averagePerson = averagePersonRepository.findAvergagePerson();
        if (averagePerson == null) {
            averagePerson = new AveragePerson();
            averagePerson.setCountry("PL");
            averagePerson.setDailyFootprint(0.0f);
            averagePerson.setHouseholdFootprint(0.0f);
            averagePersonRepository.save(averagePerson);
            System.out.println("AveragePerson initialized with country: PL, dailyFootprint: 0, householdFootprint: 0");
        }
    }
}

