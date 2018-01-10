package com.teskekarol.footballstats.Controller;

import com.teskekarol.footballstats.Entity.Footballer;
import com.teskekarol.footballstats.Entity.Team;
import com.teskekarol.footballstats.Service.FootballerService;
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
@CrossOrigin(origins = "http://localhost:3000")
public class TeamsController {

    @Autowired
    TeamService teamsService;

    @Autowired
    FootballerService footballerService;

    @GetMapping("/")
    public Set<Team> getAll(){
        return teamsService.findAll();
    }

    @GetMapping("/{id}/")
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

    @DeleteMapping(value = "/{id}/")
    public ResponseEntity<Team> deleteTeam(@PathVariable int id){
        System.out.println("Fetching & Deleting Team with id " + id);
        Team team = teamsService.getTeamById(id);

        if(team == null){
            System.out.println("Unable to delete. Team with id " + id);
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        System.out.println("Deleting: " + team.getName());
        team.getFootballers().stream().forEach(f -> {
            f.setTeam(null);
            footballerService.save(f);
        });
        teamsService.deleteTeamById(id);
        return new ResponseEntity<Team>(HttpStatus.NO_CONTENT);
    }
}
