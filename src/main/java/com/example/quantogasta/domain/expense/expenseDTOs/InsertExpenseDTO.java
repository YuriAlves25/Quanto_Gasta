package com.example.quantogasta.domain.expense.expenseDTOs;

import java.math.BigDecimal;
import java.time.YearMonth;

public record InsertExpenseDTO(YearMonth yearMonth, String category, BigDecimal money) {
}
