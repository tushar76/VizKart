package com.example.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Getter
@Setter
@NoArgsConstructor  
@AllArgsConstructor 
@Document(collection = "events")
public class Event {
    @Id
    private String id;
    private String description;
    private long timestamp;
}
