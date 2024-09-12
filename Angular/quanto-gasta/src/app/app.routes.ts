
import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { AuthGuard } from './services/auth-guard.service';
import { ExpensesComponent } from './pages/expenses/expenses.component';
import { AuthGuard2 } from './services/authguard2.service';

export const routes: Routes = [
  {
    path: '',
    pathMatch:'full',
    redirectTo: 'login'
  },
  {
    path: "login",
    component: LoginComponent,
    canActivate: [AuthGuard2]
  },
  {
    path: "signup",
    component: SignupComponent,
    canActivate: [AuthGuard2]
  },
  {
    path: "expenses",
    component: ExpensesComponent,
    canActivate: [AuthGuard]

  },
  {
    path: '**',
    redirectTo: 'login'
  }


];
