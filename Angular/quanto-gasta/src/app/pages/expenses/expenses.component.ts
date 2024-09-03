import { Component } from '@angular/core';
import { ToolbarComponent } from '../../components/toolbar/toolbar.component';
import { ExpenseComponent } from '../../components/expense/expense.component';


@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [
    ToolbarComponent,
    ExpenseComponent
  ],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.scss'
})
export class ExpensesComponent  {


}
