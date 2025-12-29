package com.example.backend.model;

import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDateTime;

@Entity
@Table(name = "recurring_footprint")
public class RecurringFootprint {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_recurring_footprint", columnDefinition = "INT")
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "id_user", referencedColumnName = "id_user",
            foreignKey = @ForeignKey(name = "fk_recurring_footprint_user"))
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;

    @Enumerated(EnumType.STRING)
    @Column(name = "footprint_type", columnDefinition = "VARCHAR(20)")
    private FootprintType footprintType;

    @Column(name = "name", columnDefinition = "VARCHAR(45)")
    private String name;

    @Column(name = "footprint", columnDefinition = "FLOAT(5,2)")
    private Float footprint;

    // Transport-specific field
    @Column(name = "kilometers", columnDefinition = "FLOAT(6,2)")
    private Float kilometers;

    // Food-specific field
    @Column(name = "meal", columnDefinition = "VARCHAR(20)")
    private String meal;

    @Column(name = "is_active", columnDefinition = "BOOLEAN")
    private Boolean isActive = true;

    @Column(name = "created_at", columnDefinition = "TIMESTAMP")
    private LocalDateTime createdAt;

    public RecurringFootprint() {
        this.createdAt = LocalDateTime.now();
        this.isActive = true;
    }

    // Getters and Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public FootprintType getFootprintType() {
        return footprintType;
    }

    public void setFootprintType(FootprintType footprintType) {
        this.footprintType = footprintType;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Float getFootprint() {
        return footprint;
    }

    public void setFootprint(Float footprint) {
        this.footprint = footprint;
    }

    public Float getKilometers() {
        return kilometers;
    }

    public void setKilometers(Float kilometers) {
        this.kilometers = kilometers;
    }

    public String getMeal() {
        return meal;
    }

    public void setMeal(String meal) {
        this.meal = meal;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}

