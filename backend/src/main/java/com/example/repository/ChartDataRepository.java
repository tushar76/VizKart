package com.example.repository;

import com.example.model.ChartData;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface ChartDataRepository extends MongoRepository<ChartData, String> {
    List<ChartData> findAllByMonth(String month); 
}
