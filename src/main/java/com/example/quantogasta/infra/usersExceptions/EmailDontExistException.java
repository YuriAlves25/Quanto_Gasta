package com.example.quantogasta.infra.usersExceptions;

public class EmailDontExistException extends RuntimeException {

    public EmailDontExistException() {
        super("Email not registered!");
    }

    public EmailDontExistException(String message) {
        super(message);
    }

}
