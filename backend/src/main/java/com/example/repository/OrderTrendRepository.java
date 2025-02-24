package com.example.repository;

import com.example.model.OrderTrend;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface OrderTrendRepository extends MongoRepository<OrderTrend, String> {
}
