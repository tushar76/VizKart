package com.example.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.example.model.Event;

public interface EventRepository extends MongoRepository<Event, String> {
}

