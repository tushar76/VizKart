package com.example.model;

public class OrderTrend {
    private String date;
    private int orders;

    public OrderTrend(String date, int orders) {
        this.date = date;
        this.orders = orders;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public int getOrders() {
        return orders;
    }

    public void setOrders(int orders) {
        this.orders = orders;
    }
}
