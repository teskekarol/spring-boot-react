package com.teskekarol.footballstats;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories("com.teskekarol.footballstats.Repository")
public class FootballstatsApplication {

	public static void main(String[] args) {
		SpringApplication.run(FootballstatsApplication.class, args);
	}
}
