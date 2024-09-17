package com.example.quantogasta.domain.expense.expenseDTOs;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.time.YearMonth;

public record InsertExpenseDTO(@NotNull YearMonth  yearMonth,@NotNull String category,@NotNull BigDecimal money) {
}
