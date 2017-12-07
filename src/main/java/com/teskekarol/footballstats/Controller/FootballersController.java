package com.teskekarol.footballstats.Controller;

import com.teskekarol.footballstats.Entity.Footballer;
import com.teskekarol.footballstats.Service.FootballerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Set;


@RestController
@RequestMapping("/api/footballers")
public class FootballersController {

    @Autowired
    FootballerService footballerService;

    @GetMapping("/")
    public ResponseEntity<Set<Footballer>> getAll(){
        return new ResponseEntity<Set<Footballer>>(footballerService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public Footballer getById(@PathVariable int id){
        return footballerService.getFootballerById(id);
    }
}
