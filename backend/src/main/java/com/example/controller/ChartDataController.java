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

    @PostMapping("/chart-data")
public List<ChartData> createChartData(@RequestBody List<ChartData> chartDataList) {
    return chartDataRepository.saveAll(chartDataList);
}


    @GetMapping("/chart-data")
    public List<ChartData> getChartData() {
        return chartDataRepository.findAll();
    }
}
