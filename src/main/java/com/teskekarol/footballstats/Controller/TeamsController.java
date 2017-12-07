package com.teskekarol.footballstats.Controller;

import com.teskekarol.footballstats.Entity.Team;
import com.teskekarol.footballstats.Service.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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


}
