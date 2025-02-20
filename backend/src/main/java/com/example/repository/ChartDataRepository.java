package com.example.repository;

import com.example.model.ChartData;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ChartDataRepository extends MongoRepository<ChartData, String> {
}

