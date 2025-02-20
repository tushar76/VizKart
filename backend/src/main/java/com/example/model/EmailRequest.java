package com.example.model;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Document(collection = "emails")
public class EmailRequest {
    @Id
    private String id;
    private String to;
    private String subject;
    private String body;
}

