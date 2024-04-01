package com.example.quantogasta.repositories;


import com.example.quantogasta.domain.monthExpenses.MonthExpenses;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.UUID;


public interface MonthExpensesRepository extends JpaRepository<MonthExpenses,Long> {

    boolean existsByDateAndUserId(LocalDate yearMonth, UUID userid);

}
