package com.valoriz.BookMgmtSystem.config;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.data.mongodb.config.AbstractMongoClientConfiguration;

@Configuration
public class MongoConfig extends AbstractMongoClientConfiguration {

    private final Environment env;

    public MongoConfig(Environment env) {
        this.env = env;
    }

    @Override
    protected String getDatabaseName() {
        return "BookDB";
    }

    @Override
    public MongoClient mongoClient() {
        // Read from spring.data.mongodb.uri property (supports both environment variable and application.properties)
        String uri = env.getProperty("spring.data.mongodb.uri");
        if (uri == null || uri.isEmpty()) {
            throw new IllegalStateException("MongoDB URI is not configured. Set MONGODB_URI environment variable or spring.data.mongodb.uri property.");
        }
        return MongoClients.create(uri);
    }
}