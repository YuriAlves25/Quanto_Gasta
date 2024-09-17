package com.example.quantogasta.repositories;

import com.example.quantogasta.domain.expense.Expense;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExpenseRepository extends JpaRepository<Expense,Long>  {
}
