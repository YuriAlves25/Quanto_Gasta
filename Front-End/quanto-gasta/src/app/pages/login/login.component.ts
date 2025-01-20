
import { LoginService } from './../../services/login.service';
import { Component } from '@angular/core';
import { LoginLayoutComponent } from '../../components/login-layout/login-layout.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputPrimaryComponent } from '../../components/input-primary/input-primary.component';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { delay } from 'rxjs';
import { SocialsComponent } from '../../components/socials/socials.component';


interface LoginForm {
  email: FormControl,
  password: FormControl
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    SocialsComponent,
    LoginLayoutComponent,
    ReactiveFormsModule,
    InputPrimaryComponent,

  ],
  providers: [
    LoginService
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup<LoginForm>;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastService: ToastrService
  ){
    this.loginForm = new FormGroup({
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required, Validators.minLength(6)])
    })
  }

  submit() {
    this.loginService.login(this.loginForm.value.email, this.loginForm.value.password).pipe()
    .subscribe({
      next: () => {
        this.toastService.success("Login feito com sucesso!");
        this.router.navigate(["/expenses"]);
      },
      error: () => this.toastService.error("Dados incorretos!")
    });
  }

  navigate(){
    this.router.navigate(["/signup"])
  }

}
