package com.example.backend.service;

import com.example.backend.DTO.AveragePersonDTO;
import com.example.backend.DTO.DailyFootprintDTO;
import com.example.backend.DTO.DailyStatsDTO;
import com.example.backend.DTO.UpdateAverageDailyFootprintDTO;
import com.example.backend.DTO.UpdateAverageHouseholdFootprintDTO;
import com.example.backend.model.*;
import com.example.backend.repository.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StatsService {
    private final TransportFootprintRepository transportFootprintRepository;
    private final OtherFootprintRepository otherFootprintRepository;
    private final FoodFootprintRepository foodFootprintRepository;
    private final DailyFootprintRepository dailyFootprintRepository;
    private final CompensatedFootprintRepository compensatedFootprintRepository;
    private final AveragePersonRepository averagePersonRepository;

    public StatsService(TransportFootprintRepository transportFootprintRepository, OtherFootprintRepository otherFootprintRepository, FoodFootprintRepository foodFootprintRepository, DailyFootprintRepository dailyFootprintRepository, CompensatedFootprintRepository compensatedFootprintRepository, AveragePersonRepository averagePersonRepository) {
        this.transportFootprintRepository = transportFootprintRepository;
        this.otherFootprintRepository = otherFootprintRepository;
        this.foodFootprintRepository = foodFootprintRepository;
        this.dailyFootprintRepository = dailyFootprintRepository;
        this.compensatedFootprintRepository = compensatedFootprintRepository;
        this.averagePersonRepository = averagePersonRepository;
    }

    public DailyStatsDTO getDailyStatsByID(Integer id) {
        Float sumDailyFootpintAverage = sumDailyFootprintById(id);
        AveragePerson averagePerson = averagePersonRepository.findAvergagePerson();

        return convertDailyStatsToDailyStatsDTO(averagePerson, sumDailyFootpintAverage);
    }

    public Float sumDailyFootprintById(Integer id)  {

        Float transportFootprintSum = sumDailyTransportFootprintById(id);
        Float foodFootprintSum = sumDailyFoodFootprintById(id);
        Float otherFootprintSum = sumDailyOtherFootprintById(id);
        Float compensatedFootprintSum = sumDailyCompensatedFootprintById(id);

        System.out.println(transportFootprintSum);
        System.out.println(foodFootprintSum);
        System.out.println(otherFootprintSum);
        System.out.println(compensatedFootprintSum);
        System.out.println((transportFootprintSum+foodFootprintSum+otherFootprintSum-compensatedFootprintSum));

        return transportFootprintSum+foodFootprintSum+otherFootprintSum-compensatedFootprintSum;
    }


    public Float sumDailyTransportFootprintById(Integer id)  {

        List<TransportFootprint> listOfEntities = transportFootprintRepository.findTransportFootprintById(id);
        Float sum = (float) 0;

        for (TransportFootprint t : listOfEntities) {
            sum += t.getFootprint();
        }
        return sum;
    }

    public Float sumDailyFoodFootprintById(Integer id)  {

        List<FoodFootprint> listOfEntities = foodFootprintRepository.findFoodFootprintById(id);
        Float sum = (float) 0;

        for (FoodFootprint t : listOfEntities) {
            sum += t.getFootprint();
        }
        return sum;
    }

    public Float sumDailyOtherFootprintById(Integer id)  {

        List<OtherFootprint> listOfEntities = otherFootprintRepository.findOtherFootprintById(id);
        Float sum = (float) 0;

        for (OtherFootprint t : listOfEntities) {
            sum += t.getFootprint();
        }
        return sum;
    }

    public Float sumDailyCompensatedFootprintById(Integer id)  {

        List<CompensatedFootprint> listOfEntities = compensatedFootprintRepository.findCompensatedFootprintById(id);
        Float sum = (float) 0;

        for (CompensatedFootprint t : listOfEntities) {
            sum += t.getFootprint();
        }
        return sum;
    }

    public Float sumMonthlyTransportFootprintById(Integer id)  {

        List<TransportFootprint> listOfEntities = transportFootprintRepository.findMonthlyTransportFootprintById(id);
        Float sum = (float) 0;

        for (TransportFootprint t : listOfEntities) {
            sum += t.getFootprint();
        }
        return sum;
    }

    public Float sumMonthlyFoodFootprintById(Integer id)  {

        List<FoodFootprint> listOfEntities = foodFootprintRepository.findMonthlyFoodFootprintById(id);
        Float sum = (float) 0;

        for (FoodFootprint t : listOfEntities) {
            sum += t.getFootprint();
        }
        return sum;
    }

    public Float sumMonthlyOtherFootprintById(Integer id)  {

        List<OtherFootprint> listOfEntities = otherFootprintRepository.findMonthlyOtherFootprintById(id);
        Float sum = (float) 0;

        for (OtherFootprint t : listOfEntities) {
            sum += t.getFootprint();
        }
        return sum;
    }

    public Float sumMonthlyCompensatedFootprintById(Integer id)  {

        List<CompensatedFootprint> listOfEntities = compensatedFootprintRepository.findMonthlyCompensatedFootprintById(id);
        Float sum = (float) 0;

        for (CompensatedFootprint t : listOfEntities) {
            sum += t.getFootprint();
        }
        return sum;
    }

    public DailyStatsDTO convertDailyStatsToDailyStatsDTO(AveragePerson averagePerson, Float dailyFootprint) {
        return new DailyStatsDTO(
                averagePerson.getDailyFootprint(),
                dailyFootprint
        );
    }

    public AveragePersonDTO updateAverageDailyFootprint(UpdateAverageDailyFootprintDTO updateDTO) {
        AveragePerson averagePerson = averagePersonRepository.findAvergagePerson();
        if (averagePerson == null) {
            averagePerson = new AveragePerson();
            averagePerson.setCountry("PL");
            averagePerson.setHouseholdFootprint(0.0f);
        }
        averagePerson.setDailyFootprint(updateDTO.avgDailyFootprint());
        AveragePerson saved = averagePersonRepository.save(averagePerson);
        return new AveragePersonDTO(
                saved.getId(),
                saved.getCountry(),
                saved.getDailyFootprint(),
                saved.getHouseholdFootprint()
        );
    }

    public AveragePersonDTO updateAverageHouseholdFootprint(UpdateAverageHouseholdFootprintDTO updateDTO) {
        AveragePerson averagePerson = averagePersonRepository.findAvergagePerson();
        if (averagePerson == null) {
            averagePerson = new AveragePerson();
            averagePerson.setCountry("PL");
            averagePerson.setDailyFootprint(0.0f);
        }
        averagePerson.setHouseholdFootprint(updateDTO.avgHouseholdFootprint());
        AveragePerson saved = averagePersonRepository.save(averagePerson);
        return new AveragePersonDTO(
                saved.getId(),
                saved.getCountry(),
                saved.getDailyFootprint(),
                saved.getHouseholdFootprint()
        );
    }

    public AveragePersonDTO getAveragePerson() {
        AveragePerson averagePerson = averagePersonRepository.findAvergagePerson();
        if (averagePerson == null) {
            return new AveragePersonDTO(null, "PL", 0.0f, 0.0f);
        }
        return new AveragePersonDTO(
                averagePerson.getId(),
                averagePerson.getCountry(),
                averagePerson.getDailyFootprint(),
                averagePerson.getHouseholdFootprint()
        );
    }
}
