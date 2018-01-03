package com.teskekarol.footballstats.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="team")
public class Team {
    public Team() {
        name = "no team";
        footballers = new ArrayList<>();
    }

    @Id
    @GeneratedValue
    private Long id;

    @NotNull
    private String name;

    @OneToMany(mappedBy = "team")
    @JsonManagedReference
    private List<Footballer> footballers;

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

    public List<Footballer> getFootballers() {
        return footballers;
    }

    public void setFootballers(List<Footballer> footballers) {
        this.footballers = footballers;
    }
}
