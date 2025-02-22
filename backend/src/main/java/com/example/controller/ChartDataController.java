package com.example.controller;

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
        return chartDataRepository.findAll();
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
    }).orElseThrow(() -> new RuntimeException("Chart Data not found with id: " + cleanId));
}

    
}
