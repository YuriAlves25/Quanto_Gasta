import { Expense } from './../model/expense';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first } from 'rxjs';
import { MonthExpenses } from '../model/month-expenses';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {



  apiUrl: string = "http://localhost:8080/"
  token = localStorage.getItem('auth-token')


  constructor(private httpClient: HttpClient) {

   }




   list(){
    const headers = this.token ? new HttpHeaders({ 'Authorization': `Bearer ${this.token}` }) : undefined;
    
    return this.httpClient.get<MonthExpenses[]>(this.apiUrl + "month_expenses", {headers} ).pipe(first());

  }
}