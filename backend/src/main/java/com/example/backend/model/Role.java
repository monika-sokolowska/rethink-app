package com.example.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "role")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="id_role", columnDefinition = "INT")
    private int id;

    @Enumerated(EnumType.STRING)
    @Column(name="name", columnDefinition = "VARCHAR(45)")
    private ERole name;

    public Role() {}

    public Role(ERole name) {
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public ERole getName() {
        return name;
    }

    public void setName(ERole name) {
        this.name = name;
    }
}