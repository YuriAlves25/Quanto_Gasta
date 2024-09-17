package com.example.quantogasta.infra;

import com.example.quantogasta.infra.usersExceptions.EmailAlreadyExistException;
import com.example.quantogasta.infra.usersExceptions.EmailDontExistException;
import com.example.quantogasta.infra.usersExceptions.UserNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@RestControllerAdvice
public class RequestsExceptionHandler extends ResponseEntityExceptionHandler {
    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity UserNotFoundHandler(){

        return ResponseEntity.notFound().build();
    }

    @ExceptionHandler(EmailAlreadyExistException.class)
    public ResponseEntity EmailAlreadyExistHandler(){

        var response = new ExceptionDTO("Email already exists!");

        return ResponseEntity.badRequest().body(response);
    }

    @ExceptionHandler(EmailDontExistException.class)
    public ResponseEntity EmailDontExistHandler(){

        var response = new ExceptionDTO("Email not registered!");

        return ResponseEntity.badRequest().body(response);
    }

}
