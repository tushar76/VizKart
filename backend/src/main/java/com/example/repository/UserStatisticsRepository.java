package com.example.repository;

import com.example.model.UserStatistics;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserStatisticsRepository extends MongoRepository<UserStatistics, String> {
}
