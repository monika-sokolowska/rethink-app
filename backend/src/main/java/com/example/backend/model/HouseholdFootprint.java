package com.example.backend.model;

import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.sql.Date;

@Entity
@Table(name = "household_footprint")
public class HouseholdFootprint {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    @Column(name = "id_household_footprint", columnDefinition = "INT")
    private Integer id;

    @Column(name = "date", columnDefinition = "DATE")
    private Date date;

    @Column(name = "footprint", columnDefinition = "FLOAT(6,2)")
    private Float footprint;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "id_user", referencedColumnName = "id_user",
            foreignKey = @ForeignKey(name = "fk_household_footprint_user"))
    @OnDelete(action = OnDeleteAction.NO_ACTION)
    private User user;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }


    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
    public Float getFootprint() {
        return footprint;
    }

    public void setFootprint(Float footprint) {
        this.footprint = footprint;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

}
