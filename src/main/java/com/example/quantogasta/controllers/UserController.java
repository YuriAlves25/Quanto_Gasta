package com.example.quantogasta.controllers;

import com.example.quantogasta.services.UserService;
import com.example.quantogasta.user.User;
import com.example.quantogasta.user.UserRequestDTO;
import com.example.quantogasta.user.UserResponseDTO;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;


import java.util.UUID;

@RestController
@RequestMapping(value = "user")
public class UserController {
    @Autowired
    private UserService service;

    @PostMapping(value = "sign_up")
    public ResponseEntity<User> createUser(@RequestBody @Valid UserRequestDTO data){
         User user = service.createUser(data);
         return  ResponseEntity.created(ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(user.getId()).toUri()).body(user);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<UserResponseDTO> findById(@PathVariable UUID id){

      return ResponseEntity.ok(service.findById(id));
    }

   @PutMapping(value = "/{id}")
    public ResponseEntity updateUser(@RequestBody @Valid  UserRequestDTO data,@PathVariable UUID id) {
         User user = service.updateUser(data, id);

        return ResponseEntity.ok(service.findById(user.getId()));
   }


}
