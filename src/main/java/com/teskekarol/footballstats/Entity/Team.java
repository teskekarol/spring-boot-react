package com.teskekarol.footballstats.Entity;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name="team")
public class Team {
    public Team() {
    }

    public Team(String name, LocalDate createDate, List<Footballer> footballers) {
        this.name = name;
        this.footballers = footballers;
    }

    @Id
    @GeneratedValue
    private Long id;

    @NotNull
    private String name;

    @OneToMany(mappedBy = "team")
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
