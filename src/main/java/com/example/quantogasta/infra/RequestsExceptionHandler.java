package com.example.quantogasta.infra;

import com.example.quantogasta.infra.usersExceptions.EmailAlreadyExistException;
import com.example.quantogasta.infra.usersExceptions.UserNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@RestControllerAdvice
public class RequestsExceptionHandler extends ResponseEntityExceptionHandler {
    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity UserNotFoundHandler(){

        var response = new ExceptionDTO("User not found!");

        return ResponseEntity.badRequest().body(response);
    }

    @ExceptionHandler(EmailAlreadyExistException.class)
    public ResponseEntity EmailAlreadyExistHandler(){

        var response = new ExceptionDTO("Email already exists!");

        return ResponseEntity.status(409).body(response);
    }

}
