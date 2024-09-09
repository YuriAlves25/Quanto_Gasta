import { Expense } from './../../model/expense';
import { MonthExpenses } from './../../model/month-expenses';
import { Component } from '@angular/core';
import { ExpenseService } from '../../services/expense.service';
import { Observable } from 'rxjs';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { AppMaterialImports } from '../../shared/app-material/app-material-imports';
import { MatDialog } from '@angular/material/dialog';
import { DialogFormComponent } from '../dialog-form/dialog-form.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import moment from 'moment';
import { DialogEditComponent } from '../dialog-edit/dialog-edit.component';




@Component({
  selector: 'app-expense',
  standalone: true,
  imports: [
    AsyncPipe,
    JsonPipe,
    AppMaterialImports,
    MatDatepickerModule



  ],
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.scss'
})
export class ExpenseComponent {


  monthExpenses$: Observable<MonthExpenses[]>;
;
  displayedColumns = ["category", "money", "actions"]

  constructor(private expenseService: ExpenseService,public dialog: MatDialog){
    this.monthExpenses$ = this.expenseService.getList();

  }

  formatDate(date: string): string {
    return moment(date).format('MM/YYYY');
  }

  openDialog() {
    this.dialog.open(DialogFormComponent,{
      width: '500px',
      height: '400px'
    })
    console.log("dialog aberto")
  }

  onEdit(expense: Expense) {
    this.dialog.open(DialogEditComponent,{
      data: expense,
      width: '500px',
      height: '400px'
    })


  }



}
