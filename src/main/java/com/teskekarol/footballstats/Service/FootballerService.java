package com.teskekarol.footballstats.Service;

import com.teskekarol.footballstats.Entity.Footballer;
import com.teskekarol.footballstats.Repository.FootballerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class FootballerService {
    @Autowired
    FootballerRepository footballerRepository;

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
}
