package com.example.quantogasta.controllers;


import com.example.quantogasta.domain.expense.expenseDTOs.InsertExpenseDTO;
import com.example.quantogasta.domain.monthExpenses.MonthExpenses;
import com.example.quantogasta.services.ExpenseService;
import com.example.quantogasta.services.MonthExpensesService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;


@RestController
@RequestMapping(value = "month_expenses")
public class MonthExpensesController {
    @Autowired
    private MonthExpensesService monthExpensesService;


    @GetMapping
    public ResponseEntity<Set<MonthExpenses>> getMonthExpenses(@RequestHeader(name="Authorization") String token){

            var monthExpenses = monthExpensesService.getMonthExpenses(token);

        return ResponseEntity.ok(monthExpenses);

    }


}
