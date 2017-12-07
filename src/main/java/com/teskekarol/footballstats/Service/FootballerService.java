package com.teskekarol.footballstats.Service;

import com.teskekarol.footballstats.Entity.Footballer;
import com.teskekarol.footballstats.Repository.FootballerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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
}
