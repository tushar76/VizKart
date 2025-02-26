package com.example.controller;
import com.example.exception.ResourceNotFoundException;
import com.example.model.UserStatistics;
import com.example.repository.UserStatisticsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class UserStatisticsController {

    @Autowired
    private UserStatisticsRepository userStatisticsRepository;

    @PostMapping("/user-statistics")
public UserStatistics createUserStatistics(@RequestBody UserStatistics userStatistics) {
    return userStatisticsRepository.save(userStatistics);
}

@GetMapping("/user-statistics")
public UserStatistics getUserStatistics() {
    return userStatisticsRepository.findAll().stream()
            .findFirst()
            .orElseThrow(() -> new ResourceNotFoundException("No user statistics found."));
}

}
