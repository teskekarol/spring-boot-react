package com.teskekarol.footballstats.Controller;

import com.teskekarol.footballstats.Entity.Footballer;
import com.teskekarol.footballstats.Service.FootballerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.nio.file.Path;
import java.util.List;
import java.util.Set;


@RestController
@RequestMapping("/api/footballers")
@CrossOrigin(origins = "http://localhost:3000")
public class FootballersController {

    @Autowired
    FootballerService footballerService;


    @GetMapping("/")
    public ResponseEntity<Set<Footballer>> getAll(){
        return new ResponseEntity<>(footballerService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}/")
    public Footballer getById(@PathVariable int id){
        return footballerService.getFootballerById(id);
    }

    @PostMapping("/")
    @ResponseBody  public ResponseEntity<Long> addNewFootballer(@RequestBody Footballer footballer, UriComponentsBuilder ucBuilder){
        System.out.println("Creating new footballer");
        System.out.println("Footballer from request: " + footballer.toString());
        footballer = footballerService.save(footballer);
        HttpHeaders headers = new HttpHeaders();
        headers.set("footballerid", String.valueOf(footballer.getId()));
        System.out.println("saved footbaler id: " + footballer.getId());
        headers.setLocation(ucBuilder.path("footballers/{id}").buildAndExpand(footballer.getId()).toUri());
        headers.set("Access-Control-Expose-Headers", "Date, location, footballerid");
        return new ResponseEntity<>(Long.valueOf(footballer.getId()),headers, HttpStatus.CREATED);
    }


    @DeleteMapping(value = "/{id}/")
    public  ResponseEntity<Footballer> deleteUser(@PathVariable("id") int id) {
        System.out.println("Fetching & Deleting Footballer with id " + id);

        Footballer footballer = footballerService.getFootballerById(id);
        if (footballer == null) {
            System.out.println("Unable to delete. Footballer with id " + id + " not found");
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        System.out.println("deleting: " + footballer.getName());
        footballerService.deleteUserById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping(value = "/")
    public ResponseEntity<Footballer> updateFootballer(@RequestBody Footballer footballer){
        System.out.println("to update id: " + footballer.getId());
        System.out.println("to update name: " + footballer.getName());
        if(footballerService.update(footballer) == 0) {
            System.out.println("Updating");
            return new ResponseEntity<>(HttpStatus.ACCEPTED);
        }
        else{
            System.out.println("Updating cant be finished!");
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }
}
