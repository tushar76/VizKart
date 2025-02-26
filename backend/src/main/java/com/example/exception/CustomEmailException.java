package com.example.exception;

public class CustomEmailException extends RuntimeException {
    public CustomEmailException(String message) {
        super(message);
    }
}
