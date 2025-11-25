package com.valoriz.BookMgmtSystem;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@EnableMongoRepositories
public class BookMgmtSystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(BookMgmtSystemApplication.class, args);
	}

}

