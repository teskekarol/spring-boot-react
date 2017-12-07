package com.teskekarol.footballstats.Entity;


import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name="Footballer")
public class Footballer {

    public Footballer() {
    }

    public Footballer(String name, int age) {
        this.name = name;
        this.age = age;
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
}
