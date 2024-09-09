package com.example.quantogasta.services;


import com.example.quantogasta.domain.expense.Expense;
import com.example.quantogasta.domain.expense.expenseDTOs.DeleteExpenseDTO;
import com.example.quantogasta.domain.expense.expenseDTOs.InsertExpenseDTO;

import com.example.quantogasta.domain.expense.expenseDTOs.UpdateExpenseDTO;
import com.example.quantogasta.domain.monthExpenses.MonthExpenses;
import com.example.quantogasta.repositories.ExpenseRepository;
import org.hibernate.sql.Update;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import java.time.LocalDate;


@Service
public class ExpenseService {

    @Autowired
    private ExpenseRepository repository;

    @Autowired
    MonthExpensesService monthExpensesService;


    public void insertExpense(InsertExpenseDTO data,String token){
        LocalDate date = LocalDate.of(data.yearMonth().getYear(),data.yearMonth().getMonth(), 01);

        MonthExpenses monthExpenses =monthExpensesService.findMonthExpenses(token,date);

        repository.save(new Expense(null,data.money(),data.category(),monthExpenses ));
    }


    public void updateExpense(UpdateExpenseDTO data){
        Expense expense = repository.findById(data.id()).get();

        expense.setCategory(data.category());
        expense.setMoney(data.money());

        repository.save(expense);

    }

    public void deleteExpense(DeleteExpenseDTO data, String token) {
        Expense expense = repository.findById(data.id()).get();

        MonthExpenses monthExpenses = expense.getMonthExpenses();
        if (monthExpensesService.expenseBelongsToUser(monthExpenses,token)){
            repository.delete(expense);

        }
        monthExpensesService.checkEmptyMonthExpense(monthExpenses);
    }
}
