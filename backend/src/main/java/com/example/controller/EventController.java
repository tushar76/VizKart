package com.example.controller;

import com.example.exception.ResourceNotFoundException;
import com.example.model.Event;
import com.example.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class EventController {

    @Autowired
    private EventRepository eventRepository;

    @PostMapping("/events/bulk")
public List<Event> createEvents(@RequestBody List<Event> events) {
    return eventRepository.saveAll(events);
}

    @PostMapping("/events")
    public Event createEvent(@RequestBody Event event) {
        return eventRepository.save(event);
    }

    @GetMapping("/events")
    public List<Event> getEvents() {
        List<Event> events = eventRepository.findAll();
        if (events.isEmpty()) {
            // Throws custom exception if no events are found
            throw new ResourceNotFoundException("No events found.");
        }
        return events;
    }
    


}
