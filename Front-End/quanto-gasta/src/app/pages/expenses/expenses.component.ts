import { Component } from '@angular/core';
import { ExpenseComponent } from '../../components/expense/expense.component';


@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [

    ExpenseComponent
  ],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.scss'
})
export class ExpensesComponent  {


}
