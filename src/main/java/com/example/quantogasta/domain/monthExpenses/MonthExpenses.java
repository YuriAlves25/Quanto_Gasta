package com.example.quantogasta.domain.monthExpenses;

import com.example.quantogasta.domain.expense.Expense;
import com.example.quantogasta.domain.user.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.*;

@Entity
@Table(name = "month_expenses")
public class MonthExpenses {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long monthExpensesId;

    private LocalDate date;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    private User user;

    @OneToMany(mappedBy = "monthExpenses")
    private List<Expense> expenses = new ArrayList<>();

    public MonthExpenses() {
    }

    public MonthExpenses(Long id, LocalDate date, User user) {
        this.monthExpensesId = id;
        this.date = date;
        this.user = user;
    }

    public Long getId() {
        return monthExpensesId;
    }


    public LocalDate getdate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public BigDecimal getTotal() {
        BigDecimal total = BigDecimal.ZERO;
        for (Expense expense : expenses) {
            total = total.add(expense.getMoney());
        }
        return total;
    }

    @JsonIgnore
    public User getUser() {
        return user;
    }

    public List<Expense> getExpenses() {
        return expenses;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof MonthExpenses that)) return false;
        return Objects.equals(date, that.date) && Objects.equals(getUser(), that.getUser());
    }

    @Override
    public int hashCode() {
        return Objects.hash(date, getUser());
    }
}
