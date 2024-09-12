import { Expense } from './../../model/expense';
import { MonthExpenses } from './../../model/month-expenses';
import { Component } from '@angular/core';
import { ExpenseService } from '../../services/expense.service';
import { Observable, Subscription } from 'rxjs';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { AppMaterialImports } from '../../shared/app-material/app-material-imports';
import { MatDialog } from '@angular/material/dialog';
import { DialogFormComponent } from '../dialog-form/dialog-form.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import moment from 'moment';
import { DialogEditComponent } from '../dialog-edit/dialog-edit.component';
import { ToastrService } from 'ngx-toastr';





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


  constructor(private expenseService: ExpenseService,
              public dialog: MatDialog,
              private toastService: ToastrService,
            ){
    this.monthExpenses$ = this.expenseService.getList();

  }

  public refresh() {
   return this.monthExpenses$ = this.expenseService.getList();
  }

  formatDate(date: string): string {
    return moment(date).format('MM/YYYY');
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogFormComponent,{
      width: '500px',
      height: '400px'
    })
    dialogRef.afterClosed().subscribe(() => this.refresh());
  }

  onEdit(expense: Expense) {
    const dialogRef = this.dialog.open(DialogEditComponent,{
      data: expense,
      width: '500px',
      height: '400px'
    });

    dialogRef.afterClosed().subscribe(() => this.refresh());

  }



  onRemove(expense: Expense) {
      this.expenseService.removeDelete(expense.id)
      .subscribe( () => { this.refresh(); this.toastService.success("Gasto excluido com sucesso") })  ;
  }



}
