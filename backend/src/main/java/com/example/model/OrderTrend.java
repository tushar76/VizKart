package com.example.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Document(collection = "orderTrends")
public class OrderTrend {
    @Id
    private String id;
    private String date;
    private int orders;
}
