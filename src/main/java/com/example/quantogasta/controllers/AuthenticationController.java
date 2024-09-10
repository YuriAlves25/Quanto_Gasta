package com.example.quantogasta.controllers;

import com.example.quantogasta.domain.user.userDTOs.AuthenticationDTO;
import com.example.quantogasta.domain.user.userDTOs.LoginResponseDTO;
import com.example.quantogasta.domain.user.userDTOs.RegisterDTO;
import com.example.quantogasta.services.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("auth")
public class AuthenticationController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity login (@RequestBody @Valid AuthenticationDTO data){

        var token = userService.login(data);

        return ResponseEntity.ok(new LoginResponseDTO(token));
    }

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody @Valid RegisterDTO data){

        userService.register(data);

        var token = userService.login(new AuthenticationDTO(data.email(), data.password()));
        return ResponseEntity.ok(new LoginResponseDTO(token));
    }



}
