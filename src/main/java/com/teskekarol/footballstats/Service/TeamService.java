package com.teskekarol.footballstats.Service;

import com.teskekarol.footballstats.Entity.Team;
import com.teskekarol.footballstats.Repository.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class TeamService {
    @Autowired
    TeamRepository teamRepository;

    public Set<Team> findAll(){
        Set<Team> listOfTeams = new HashSet<>();
        teamRepository.findAll().forEach(t -> listOfTeams.add(t));
        return listOfTeams;
    }

    public Team getTeamById(int id) {
        return teamRepository.findOne(Long.valueOf(id));
    }

    public Team save(Team team) {
        return teamRepository.save(team);
    }

    public void deleteTeamById(int id) {
        teamRepository.delete(Long.valueOf(id));
    }
}
