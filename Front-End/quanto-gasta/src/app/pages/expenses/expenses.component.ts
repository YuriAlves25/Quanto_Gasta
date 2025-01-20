import { Component } from '@angular/core';
import { ExpenseComponent } from '../../components/expense/expense.component';
import { SocialsComponent } from "../../components/socials/socials.component";


@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [
    ExpenseComponent,
    SocialsComponent
],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.scss'
})
export class ExpensesComponent  {


}
