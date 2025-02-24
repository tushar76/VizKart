package com.example.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Document(collection = "userStatistics")
public class UserStatistics {
    @Id
    private String id;
    private int totalUsers;
    private int activeUsers;
    private int newSignups;
    private int returningUsers;
}
