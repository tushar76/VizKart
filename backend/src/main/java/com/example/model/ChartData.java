package com.example.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Document(collection = "chartData")
public class ChartData {
    @Id
    private String id;
    private String month;
    private int value;
}
