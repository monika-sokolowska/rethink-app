package com.example.backend.service;

import com.example.backend.DTO.AddRecurringFootprintDTO;
import com.example.backend.DTO.RecurringFootprintDTO;
import com.example.backend.model.*;
import com.example.backend.repository.*;
import com.example.backend.util.Meal;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class RecurringFootprintService {

    private static final Logger logger = LoggerFactory.getLogger(RecurringFootprintService.class);

    private final RecurringFootprintRepository recurringFootprintRepository;
    private final UserRepository userRepository;
    private final DailyFootprintService dailyFootprintService;
    private final TransportFootprintRepository transportFootprintRepository;
    private final FoodFootprintRepository foodFootprintRepository;
    private final OtherFootprintRepository otherFootprintRepository;
    private final CompensatedFootprintRepository compensatedFootprintRepository;
    private final DailyFootprintRepository dailyFootprintRepository;

    @Autowired
    public RecurringFootprintService(
            RecurringFootprintRepository recurringFootprintRepository,
            UserRepository userRepository,
            DailyFootprintService dailyFootprintService,
            TransportFootprintRepository transportFootprintRepository,
            FoodFootprintRepository foodFootprintRepository,
            OtherFootprintRepository otherFootprintRepository,
            CompensatedFootprintRepository compensatedFootprintRepository,
            DailyFootprintRepository dailyFootprintRepository) {
        this.recurringFootprintRepository = recurringFootprintRepository;
        this.userRepository = userRepository;
        this.dailyFootprintService = dailyFootprintService;
        this.transportFootprintRepository = transportFootprintRepository;
        this.foodFootprintRepository = foodFootprintRepository;
        this.otherFootprintRepository = otherFootprintRepository;
        this.compensatedFootprintRepository = compensatedFootprintRepository;
        this.dailyFootprintRepository = dailyFootprintRepository;
    }


    public List<RecurringFootprintDTO> findAllByUserId(Integer userId) {
        List<RecurringFootprint> list = recurringFootprintRepository.findAllByUserId(userId);
        ArrayList<RecurringFootprintDTO> dtos = new ArrayList<>();
        for (RecurringFootprint r : list) {
            dtos.add(convertToDTO(r));
        }
        return dtos;
    }

    public RecurringFootprintDTO addRecurringFootprint(Integer userId, AddRecurringFootprintDTO dto) {
        RecurringFootprint recurring = new RecurringFootprint();
        recurring.setUser(userRepository.findUserById(userId));
        recurring.setFootprintType(dto.footprintType());
        recurring.setName(dto.name());
        recurring.setFootprint(dto.footprint());
        recurring.setKilometers(dto.kilometers());
        recurring.setMeal(dto.meal());
        recurring.setIsActive(true);

        recurringFootprintRepository.save(recurring);
        return convertToDTO(recurring);
    }

    public RecurringFootprintDTO deleteRecurringFootprint(Integer userId, Integer recurringId) {
        RecurringFootprint recurring = recurringFootprintRepository.findRecurringFootprintById(recurringId);

        if (recurring == null) {
            return null;
        }

        if (Objects.equals(recurring.getUser().getId(), userId)) {
            recurringFootprintRepository.deleteById(recurringId);
        }

        return convertToDTO(recurring);
    }

    public RecurringFootprintDTO toggleRecurringFootprint(Integer userId, Integer recurringId) {
        RecurringFootprint recurring = recurringFootprintRepository.findRecurringFootprintById(recurringId);

        if (recurring == null) {
            return null;
        }

        if (Objects.equals(recurring.getUser().getId(), userId)) {
            recurring.setIsActive(!recurring.getIsActive());
            recurringFootprintRepository.save(recurring);
        }

        return convertToDTO(recurring);
    }

    @Scheduled(cron = "0 0 0 * * ?")
    @Transactional
    public void processRecurringFootprints() {
        logger.info("Starting daily recurring footprint processing...");

        List<RecurringFootprint> activeTemplates = recurringFootprintRepository.findAllActive();
        int processedCount = 0;

        for (RecurringFootprint template : activeTemplates) {
            try {
                createFootprintFromTemplate(template);
                processedCount++;
            } catch (Exception e) {
                logger.error("Failed to process recurring footprint id={}: {}", 
                    template.getId(), e.getMessage());
            }
        }

        logger.info("Completed daily recurring footprint processing. Processed {} footprints.", processedCount);
    }

    private void createFootprintFromTemplate(RecurringFootprint template) {
        Integer userId = template.getUser().getId();

        dailyFootprintService.findOrCreateDailyFootprintById(userId);
        DailyFootprint dailyFootprint = dailyFootprintRepository.findDailyFootprintById(userId);

        switch (template.getFootprintType()) {
            case TRANSPORT:
                TransportFootprint transport = new TransportFootprint();
                transport.setName(template.getName());
                transport.setFootprint(template.getFootprint());
                transport.setKilometers(template.getKilometers());
                transport.setDailyFootprint(dailyFootprint);
                transportFootprintRepository.save(transport);
                logger.debug("Created transport footprint for user {}", userId);
                break;

            case FOOD:
                FoodFootprint food = new FoodFootprint();
                food.setName(template.getName());
                food.setFootprint(template.getFootprint());
                if (template.getMeal() != null) {
                    try {
                        food.setMeal(Meal.valueOf(template.getMeal()));
                    } catch (IllegalArgumentException e) {
                        food.setMeal(Meal.LUNCH); // Default fallback
                    }
                }
                food.setDailyFootprint(dailyFootprint);
                foodFootprintRepository.save(food);
                logger.debug("Created food footprint for user {}", userId);
                break;

            case OTHER:
                OtherFootprint other = new OtherFootprint();
                other.setName(template.getName());
                other.setFootprint(template.getFootprint());
                other.setDailyFootprint(dailyFootprint);
                otherFootprintRepository.save(other);
                logger.debug("Created other footprint for user {}", userId);
                break;

            case COMPENSATED:
                CompensatedFootprint compensated = new CompensatedFootprint();
                compensated.setName(template.getName());
                compensated.setFootprint(template.getFootprint());
                compensated.setDailyFootprint(dailyFootprint);
                compensatedFootprintRepository.save(compensated);
                logger.debug("Created compensated footprint for user {}", userId);
                break;
        }
    }


    private RecurringFootprintDTO convertToDTO(RecurringFootprint recurring) {
        return new RecurringFootprintDTO(
                recurring.getId(),
                recurring.getFootprintType(),
                recurring.getName(),
                recurring.getFootprint(),
                recurring.getKilometers(),
                recurring.getMeal(),
                recurring.getIsActive(),
                recurring.getCreatedAt()
        );
    }
}

