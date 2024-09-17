package com.example.quantogasta.infra.usersExceptions;

public class EmailAlreadyExistException extends RuntimeException {

    public EmailAlreadyExistException() {
        super("Email already exists!");
    }

    public EmailAlreadyExistException(String message) {
        super(message);
    }

}
