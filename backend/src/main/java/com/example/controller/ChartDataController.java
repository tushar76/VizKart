package com.example.controller;

import com.example.exception.ResourceNotFoundException;
import com.example.model.ChartData;
import com.example.repository.ChartDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ChartDataController {

    @Autowired
    private ChartDataRepository chartDataRepository;

    @GetMapping("/chart-data")
public List<ChartData> getChartData() {
    List<ChartData> chartData = chartDataRepository.findAll();
    if (chartData.isEmpty()) {
         // Throws custom exception if no events are found
        throw new ResourceNotFoundException("No chart data found.");
    }
    return chartData;
}

    @PostMapping("/chart-data")
    public List<ChartData> addChartData(@RequestBody List<ChartData> chartDataList) {
        return chartDataRepository.saveAll(chartDataList);
    }


@PutMapping("/chart-data/{id}")
public ChartData updateChartData(@PathVariable String id, @RequestBody ChartData updatedChartData) {
    String cleanId = id.trim();
    return chartDataRepository.findById(cleanId).map(chartData -> {
        chartData.setMonth(updatedChartData.getMonth());
        chartData.setValue(updatedChartData.getValue());
        return chartDataRepository.save(chartData);
    }).orElseThrow(() -> 
        // Throws custom exception if chart data with the given ID is not found
        new ResourceNotFoundException("Chart Data not found with id: " + cleanId)
    );
}

    
}
