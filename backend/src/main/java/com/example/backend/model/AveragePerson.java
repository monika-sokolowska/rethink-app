package com.example.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "average_person")
public class AveragePerson {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    @Column(name = "id_average_person", columnDefinition = "INT")
    private Integer id;

    @Column(name = "country", columnDefinition = "VARCHAR(45)")
    private String country;

    @Column(name = "daily_footprint", columnDefinition = "FLOAT(5,2)")
    private Float dailyFootprint;

    @Column(name = "household_footprint", columnDefinition = "FLOAT(5,2)")
    private Float householdFootprint;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public Float getDailyFootprint() {
        return dailyFootprint;
    }

    public void setDailyFootprint(Float dailyFootprint) {
        this.dailyFootprint = dailyFootprint;
    }

    public Float getHouseholdFootprint() {
        return householdFootprint;
    }

    public void setHouseholdFootprint(Float householdFootprint) {
        this.householdFootprint = householdFootprint;
    }
}
