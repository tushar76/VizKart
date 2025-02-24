package com.example.controller;

import com.example.exception.ResourceNotFoundException;
import com.example.model.OrderTrend;
import com.example.repository.OrderTrendRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class OrderTrendController {

    @Autowired
    private OrderTrendRepository orderTrendRepository;

    @PostMapping("/order-trends")
public List<OrderTrend> createOrderTrends(@RequestBody List<OrderTrend> orderTrends) {
    return orderTrendRepository.saveAll(orderTrends);
}


    @GetMapping("/order-trends")
public List<OrderTrend> getOrderTrends() {
    List<OrderTrend> orderTrends = orderTrendRepository.findAll();
    if (orderTrends.isEmpty()) {
        // Throws custom exception if no user statistics are found
        throw new ResourceNotFoundException("No order trends found.");
    }
    return orderTrends;
}

}
