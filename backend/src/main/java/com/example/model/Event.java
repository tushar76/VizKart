package com.example.model;

public class Event {
    private int id;
    private String description; 
    private long timestamp;

    public Event(int id, String description, long timestamp) {
        this.id = id;
        this.description = description;
        this.timestamp = timestamp;
    }

    public int getId() { return id; }
    public String getDescription() { return description; } 
    public long getTimestamp() { return timestamp; }
}
