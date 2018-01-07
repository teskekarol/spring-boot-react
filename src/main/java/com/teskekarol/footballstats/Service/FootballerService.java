package com.teskekarol.footballstats.Service;

import com.teskekarol.footballstats.Entity.Footballer;
import com.teskekarol.footballstats.Entity.Team;
import com.teskekarol.footballstats.Repository.FootballerRepository;
import com.teskekarol.footballstats.Repository.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class FootballerService {
    @Autowired
    FootballerRepository footballerRepository;

    @Autowired
    TeamRepository teamRepository;

    public Set<Footballer> findAll(){
        Set<Footballer> listOfFootballer = new HashSet<>();
        footballerRepository.findAll().forEach(t -> listOfFootballer.add(t));

        return listOfFootballer;
    }

    public Footballer getFootballerById(int id) {
        return footballerRepository.findOne(Long.valueOf(id));
    }


    public void save(Footballer footballer) {
        System.out.println("Saving footballer name: " + footballer.getName());
        System.out.println("Saving footballer age: " + footballer.getAge());
        footballerRepository.save(footballer);
    }

    public void deleteUserById(int id) {
        footballerRepository.delete(Long.valueOf(id));
    }

    public int update(Footballer footballer) {
        Footballer footballerFromDB = footballerRepository.findOne(footballer.getId());
        if(footballerFromDB != null){
            Team teamFromDB = teamRepository.findOne(footballerFromDB.getTeam().getId());
            if(teamFromDB == null || footballer.getTeam()== null) {
                System.out.println("Team with id " + footballer.getId() + " doesn't exist, cancelled");
                return -1;
            }
            System.out.println("Changing " + footballer.getName() + " team from " + footballerFromDB.getTeam().getName()
              + " to: " + footballer.getTeam().getId());

            footballer.setTeam(teamFromDB);
            teamFromDB.getFootballers().add(footballer);
            teamRepository.save(teamFromDB);
            footballerRepository.save(footballer);
            return 0;
        }else {
            System.out.println("Footballer with id " + footballer.getId() + " doesn't exist, cancelled");
            return -1;
        }
    }
}
