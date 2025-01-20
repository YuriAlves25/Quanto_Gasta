import { SocialsComponent } from './../../components/socials/socials.component';
import { LoginService } from '../../services/login.service';
import { Component } from '@angular/core';
import { LoginLayoutComponent } from '../../components/login-layout/login-layout.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  ValidationErrors,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';
import { InputPrimaryComponent } from '../../components/input-primary/input-primary.component';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

interface SignupForm {
  username: FormControl;
  email: FormControl;
  password: FormControl;
  confirmPassword: FormControl;
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [LoginLayoutComponent, ReactiveFormsModule, InputPrimaryComponent, SocialsComponent],
  providers: [LoginService],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  [x: string]: any;
  signupForm!: FormGroup<SignupForm>;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastService: ToastrService
  ) {
    this.signupForm = new FormGroup(
      {
        username: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
        ]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
        confirmPassword: new FormControl('', [
          Validators.required,
        ]),
      },
      {
        validators: this.matchpassword,
      }
    );

  }

  matchpassword: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    return password &&
      confirmPassword &&
      password.value !== confirmPassword.value
      ? { passwordmatcherror: true }
      : null;
  };

  submit() {
    this.loginService
      .signup(
        this.signupForm.value.email,
        this.signupForm.value.password,
        this.signupForm.value.username
      )
      .subscribe({
        next: () => {
          this.toastService.success('Conta criada com sucesso!'),
            this.router.navigate(['/expenses']);
        },
        error: () => this.toastService.error('Dados incorretos!'),
      });
  }

  navigate() {
    this.router.navigate(['/login']);
  }
}
