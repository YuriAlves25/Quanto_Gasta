package com.example.quantogasta.controllers;

import com.example.quantogasta.domain.monthExpenses.MonthExpenses;
import com.example.quantogasta.domain.user.User;
import com.example.quantogasta.services.UserService;
import com.example.quantogasta.domain.user.userDTOs.RegisterDTO;
import com.example.quantogasta.domain.user.userDTOs.UserResponseDTO;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;




import java.util.Set;
import java.util.UUID;

@RestController
@RequestMapping(value = "user")
public class UserController {
    @Autowired
    private UserService service;

    @GetMapping(value = "/{id}/meses")
    public ResponseEntity<Set<MonthExpenses>> getMonthYear(@PathVariable UUID id){
        Set<MonthExpenses> list = service.getYearMonthSet(id);

        return ResponseEntity.ok().body(list);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<UserResponseDTO> findById(@PathVariable UUID id){

      return ResponseEntity.ok(service.findById(id));
    }

   @PutMapping(value = "/{id}")
    public ResponseEntity updateUser(@RequestBody @Valid RegisterDTO data, @PathVariable UUID id) {
         User user = service.updateUser(data, id);

        return ResponseEntity.ok(service.findById(user.getId()));
   }

}
