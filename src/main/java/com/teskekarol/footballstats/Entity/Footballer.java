package com.teskekarol.footballstats.Entity;


import com.fasterxml.jackson.annotation.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name="Footballer")
public class Footballer {

    public Footballer() {
        name = "";
        age = 0;
        team = null;
    }

    public Footballer(String name, int age, Team team) {
        this.name = name;
        this.age = age;
        this.team = team;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    private String name;

    @NotNull
    private int age;

    @ManyToOne
    @JoinColumn(name="team_id")
    @JsonBackReference
    private Team team;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public Team getTeam() {
        return team;
    }

    public void setTeam(Team team) {
        this.team = team;
    }

}
