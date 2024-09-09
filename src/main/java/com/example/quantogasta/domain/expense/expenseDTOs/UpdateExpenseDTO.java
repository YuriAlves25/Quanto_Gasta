package com.example.quantogasta.domain.expense.expenseDTOs;

import java.math.BigDecimal;
import java.time.YearMonth;

public record UpdateExpenseDTO(Long id, String category, BigDecimal money) {

}
