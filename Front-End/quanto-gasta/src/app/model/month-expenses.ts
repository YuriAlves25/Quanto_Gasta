import { Expense } from "./expense";

export interface MonthExpenses {
  date: string;
  expenses: Expense[];
  id: string;
  total: number;
}
