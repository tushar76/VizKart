package com.example.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.example.model.EmailRequest;

public interface EmailRequestRepository extends MongoRepository<EmailRequest, String> {
}

