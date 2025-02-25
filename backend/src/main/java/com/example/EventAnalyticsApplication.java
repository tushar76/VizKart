package com.example;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class EventAnalyticsApplication {
    public static void main(String[] args) {
        // Load .env variables
        Dotenv dotenv = Dotenv.configure().load();

        // Set environment variables as system properties
        System.setProperty("MAIL_USERNAME", dotenv.get("MAIL_USERNAME"));
        System.setProperty("MAIL_PASSWORD", dotenv.get("MAIL_PASSWORD"));

        SpringApplication.run(EventAnalyticsApplication.class, args);
    }
}
