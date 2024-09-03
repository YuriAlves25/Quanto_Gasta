import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { UserComponent } from './pages/user/user.component';
import { AuthGuard } from './services/auth-guard.service';
import { ExpensesComponent } from './pages/expenses/expenses.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch:'full',
    redirectTo: 'login'
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "signup",
    component: SignupComponent
  },
  {
    path: "user",
    component: UserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "expenses",
    component: ExpensesComponent,
    canActivate: [AuthGuard]

  }


];
