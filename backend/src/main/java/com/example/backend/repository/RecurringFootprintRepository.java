package com.example.backend.repository;

import com.example.backend.model.RecurringFootprint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecurringFootprintRepository extends JpaRepository<RecurringFootprint, Integer> {

    @Query("SELECT r FROM RecurringFootprint r WHERE r.user.id = ?1")
    List<RecurringFootprint> findAllByUserId(Integer userId);

    @Query("SELECT r FROM RecurringFootprint r WHERE r.user.id = ?1 AND r.isActive = true")
    List<RecurringFootprint> findActiveByUserId(Integer userId);

    @Query("SELECT r FROM RecurringFootprint r WHERE r.isActive = true")
    List<RecurringFootprint> findAllActive();

    @Query("SELECT r FROM RecurringFootprint r WHERE r.id = ?1")
    RecurringFootprint findRecurringFootprintById(Integer id);
}

