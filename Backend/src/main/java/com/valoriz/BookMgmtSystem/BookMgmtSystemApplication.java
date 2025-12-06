//package com.valoriz.BookMgmtSystem;
//
//import org.springframework.boot.SpringApplication;
//import org.springframework.boot.autoconfigure.SpringBootApplication;
//import org.springframework.context.annotation.Bean;
//import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
//import org.springframework.web.client.RestTemplate;
//
//@SpringBootApplication
//@EnableMongoRepositories
//public class BookMgmtSystemApplication {
//
//	@Bean
//	public RestTemplate restTemplate() {
//		return new RestTemplate();
//	}
//
//
//	public static void main(String[] args)
//	{
//
//		SpringApplication.run(BookMgmtSystemApplication.class, args);
//
//	}
//
//
//}
//



import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.env.Environment; // Import Environment

@SpringBootApplication
public class BookMgmtSystemApplication {

	public static void main(String[] args) {
		// Run the application and get the environment context
		Environment env = SpringApplication.run(BookMgmtSystemApplication.class, args).getEnvironment();

		// TEMPORARY: Print the variable to the Railway logs
		String mongoUri = env.getProperty("SPRING_DATA_MONGODB_URI");
		System.out.println("\n\n*** DEBUG: Loaded MONGO_URI: " + mongoUri + " ***\n\n");

		// Check where the default host comes from
		String defaultHost = env.getProperty("spring.data.mongodb.host");
		System.out.println("*** DEBUG: Default Host: " + defaultHost + " ***");
	}
}