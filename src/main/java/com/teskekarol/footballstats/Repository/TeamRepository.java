package com.teskekarol.footballstats.Repository;

import com.teskekarol.footballstats.Entity.Team;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TeamRepository extends CrudRepository<Team, Long>{

}
