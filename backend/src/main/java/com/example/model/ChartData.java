package com.example.model;

public class ChartData {
    private String month;
    private int value;

    public ChartData(String month, int value) {
        this.month = month;
        this.value = value;
    }

    public String getMonth() { return month; }
    public int getValue() { return value; }
}
