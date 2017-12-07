package com.teskekarol.footballstats.Repository;

import com.teskekarol.footballstats.Entity.Footballer;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FootballerRepository extends CrudRepository<Footballer, Long>{

}
