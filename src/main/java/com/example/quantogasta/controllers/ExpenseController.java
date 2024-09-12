package com.example.quantogasta.controllers;


import com.example.quantogasta.domain.expense.expenseDTOs.DeleteExpenseDTO;
import com.example.quantogasta.domain.expense.expenseDTOs.InsertExpenseDTO;
import com.example.quantogasta.domain.expense.expenseDTOs.UpdateExpenseDTO;
import com.example.quantogasta.services.ExpenseService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping(value = "expenses")
public class ExpenseController {
    @Autowired
    private ExpenseService expenseService;


    @PostMapping
    public ResponseEntity insertExpense(@RequestBody @Valid InsertExpenseDTO data,@RequestHeader(name="Authorization") String token){

       expenseService.insertExpense(data, token);


        return ResponseEntity.ok().build();
    }

    @PutMapping
    public ResponseEntity updateExpense(@RequestBody @Valid UpdateExpenseDTO data, @RequestHeader(name="Authorization") String token){

        expenseService.updateExpense(data, token);

        return ResponseEntity.ok().build();
    }

    @DeleteMapping
    public ResponseEntity deleteExpense(@RequestBody @Valid DeleteExpenseDTO data,@RequestHeader(name="Authorization") String token ){

        expenseService.deleteExpense(data, token);

        return ResponseEntity.ok().build();
    }


}
