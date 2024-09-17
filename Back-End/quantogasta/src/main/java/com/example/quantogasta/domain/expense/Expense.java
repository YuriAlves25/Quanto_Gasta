package com.example.quantogasta.domain.expense;

import com.example.quantogasta.domain.monthExpenses.MonthExpenses;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;


import java.math.BigDecimal;

import java.util.Objects;


@Entity
@Table(name = "expenses")
public class Expense {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "expense_id")
    private Long id;
    private BigDecimal money;

    private String category;

    @ManyToOne
    @JoinColumn(name = "month_Expenses_id")
    private MonthExpenses monthExpenses;

    public Expense() {
    }

    public Expense(Long id, BigDecimal money, String category,MonthExpenses monthExpenses) {
        this.id = id;
        this.money = money;
        this.category = category;
        this.monthExpenses = monthExpenses;
    }

    public Long getId() {
        return id;
    }


    public BigDecimal getMoney() {
        return money;
    }

    public void setMoney(BigDecimal money) {
        this.money = money;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String text) {
        this.category = text;
    }

    @JsonIgnore
    public MonthExpenses getMonthExpenses() {
        return monthExpenses;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Expense expense)) return false;
        return Objects.equals(getId(), expense.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId());
    }
}
