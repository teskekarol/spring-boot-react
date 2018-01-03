package com.teskekarol.footballstats.Controller;

import com.teskekarol.footballstats.Entity.Footballer;
import com.teskekarol.footballstats.Entity.Team;
import com.teskekarol.footballstats.Service.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Set;

@RestController
@RequestMapping("/api/teams")
public class TeamsController {

    @Autowired
    TeamService teamsService;

    @GetMapping("/")
    public Set<Team> getAll(){
        return teamsService.findAll();
    }

    @GetMapping("/{id}")
    public Team getById(@PathVariable int id){
        return teamsService.getTeamById(id);
    }

    @PostMapping("/")
    @ResponseBody  public ResponseEntity<Void> addNewFootballer(@RequestBody Team team, UriComponentsBuilder ucBuilder){
        System.out.println("Creating new team");

        teamsService.save(team);
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(ucBuilder.path("teams/{id}").buildAndExpand(team.getId()).toUri());

        return new ResponseEntity<>(headers, HttpStatus.CREATED);
    }

}
