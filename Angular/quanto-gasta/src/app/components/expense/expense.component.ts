import { MonthExpenses } from './../../model/month-expenses';
import { Component } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { Expense } from '../../model/expense';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ExpenseService } from '../../services/expense.service';
import { Observable } from 'rxjs';
import { AsyncPipe, JsonPipe } from '@angular/common';



@Component({
  selector: 'app-expense',
  standalone: true,
  imports: [
    MatTableModule,
    MatCardModule,
    MatToolbarModule,
    AsyncPipe,
    JsonPipe


  ],
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.scss'
})
export class ExpenseComponent {


  monthExpenses$: Observable<MonthExpenses[]>;
;
  displayedColumns = ["category", "money"]

  constructor(private expenseService: ExpenseService){
    this.monthExpenses$ = this.expenseService.list();

  }

}
