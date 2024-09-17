package com.example.quantogasta.services;

import com.example.quantogasta.domain.monthExpenses.MonthExpenses;
import com.example.quantogasta.domain.user.User;
import com.example.quantogasta.repositories.MonthExpensesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Set;

@Service
public class MonthExpensesService {

    @Autowired
    private MonthExpensesRepository repository;

    @Autowired
    private UserService userService;


    public MonthExpenses findMonthExpenses(String token, LocalDate date) {
        User user = userService.findByToken(token);
        Set<MonthExpenses> monthExpensesSet = user.getMonthExpensesSet();

        for (MonthExpenses month : monthExpensesSet) {
            if (month.getdate().isEqual(date)) {
                return month;

            }
        }
        return repository.save(new MonthExpenses(null, date, user));
    }

    public Set<MonthExpenses> getMonthExpenses(String token){
        User user = userService.findByToken(token);

        return user.getMonthExpensesSet();
    }
    public boolean expenseBelongsToUser(MonthExpenses monthExpenses,String token){
        User user = userService.findByToken(token);
        Set<MonthExpenses> monthExpensesSet = user.getMonthExpensesSet();


        if(monthExpensesSet.contains(monthExpenses)) return  true ;
        return false;

    }

    public void checkEmptyMonthExpense(MonthExpenses monthExpenses) {
        if (monthExpenses.getExpenses().isEmpty()){
            repository.delete(monthExpenses);
        }
    }
}