import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.config.AbstractMongoClientConfiguration;

@Configuration
public class MongoConfig extends AbstractMongoClientConfiguration {

    private final Environment env;

    public MongoConfig(Environment env) {
        this.env = env;
    }

    @Override
    protected String getDatabaseName() {
        // You MUST replace "BookDB" with the database name from your URI
        return "BookDB";
    }

    @Override
    public MongoClient mongoClient() {
        // Force the application to read the URI from the environment variable
        String uri = env.getProperty("SPRING_DATA_MONGODB_URI");
        if (uri == null || uri.isEmpty()) {
            throw new IllegalStateException("SPRING_DATA_MONGODB_URI environment variable is not set.");
        }
        return MongoClients.create(uri);
    }

    // Spring Boot will now use the client and database defined here.
}
//test