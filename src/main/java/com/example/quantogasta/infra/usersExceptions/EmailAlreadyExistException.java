package com.example.quantogasta.infra.usersExceptions;

public class EmailAlreadyExistException extends RuntimeException {

    public EmailAlreadyExistException() {
        super("User not found!");
    }

    public EmailAlreadyExistException(String message) {
        super(message);
    }

}
