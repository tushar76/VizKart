package com.example.controller;

import com.example.model.Event;
import com.example.model.ChartData;
import com.example.model.OrderTrend; 
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") 
public class EventController {

    @GetMapping("/events")
    public List<Event> getEvents() {
        return Arrays.asList(
            new Event(1, "User logged in", System.currentTimeMillis() - 240000),
            new Event(2, "Product added to cart", System.currentTimeMillis() - 180000),
            new Event(3, "Checkout started", System.currentTimeMillis() - 120000),
            new Event(4, "Payment successful", System.currentTimeMillis() - 60000),
            new Event(5, "User logged out", System.currentTimeMillis()),
            new Event(6, "New user registered", System.currentTimeMillis() + 60000),
            new Event(7, "Profile updated", System.currentTimeMillis() + 120000),
            new Event(8, "Password changed", System.currentTimeMillis() + 180000)
        );
    }

    @GetMapping("/chart-data")
    public List<ChartData> getChartData() {
        return Arrays.asList(
            new ChartData("Jan", 100),
            new ChartData("Feb", 150),
            new ChartData("Mar", 200),
            new ChartData("Apr", 175),
            new ChartData("May", 220),
            new ChartData("Jun", 180),
            new ChartData("Jul", 250),
            new ChartData("Aug", 210),
            new ChartData("Sep", 190),
            new ChartData("Oct", 230),
            new ChartData("Nov", 210),
            new ChartData("Dec", 240)
        );
    }

    @GetMapping("/user-statistics")
    public Map<String, Object> getUserStatistics() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalUsers", 1500);
        stats.put("activeUsers", 850);
        stats.put("newSignups", 120);
        stats.put("returningUsers", 500);
        return stats;
    }
 
    @GetMapping("/order-trends")
    public List<OrderTrend> getOrderTrends() {
    List<OrderTrend> trends = new ArrayList<>();
    LocalDate today = LocalDate.now();
    Random random = new Random();

    // Generate data for the past 8 days (older than current)
    for (int i = 8; i >= 1; i--) {
        LocalDate date = today.minusDays(i);
        String dateStr = date.toString(); // Format: YYYY-MM-DD
        int orders = 30 + random.nextInt(31); // Random orders between 30 and 60
        trends.add(new OrderTrend(dateStr, orders));
    }
    
    return trends;
}
  
}
    // @GetMapping("/order-trends")
    // public List<OrderTrend> getOrderTrends() {
    //     return Arrays.asList(
    //         new OrderTrend("2025-01-01", 45),
    //         new OrderTrend("2025-01-02", 52),
    //         new OrderTrend("2025-01-03", 38)
    //     );
    // }
