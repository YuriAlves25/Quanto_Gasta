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

  openDialog() {
    this.dialog.open(DialogFormComponent,{
      
    })
    console.log("dialog aberto")
  }

  closeDialog () {
    this.dialog.closeAll
  }

  formatDate(date: string): string {
    return moment(date).format('MM/YYYY');
  }

}
