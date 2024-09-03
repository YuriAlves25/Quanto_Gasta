import { LoginService } from '../../services/login.service';
import { Component } from '@angular/core';
import { LoginLayoutComponent } from '../../components/login-layout/login-layout.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputPrimaryComponent } from '../../components/input-primary/input-primary.component';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, switchMap } from 'rxjs/operators'

interface SignupForm {
  username: FormControl,
  email: FormControl,
  password: FormControl,
}


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    LoginLayoutComponent,
    ReactiveFormsModule,
    InputPrimaryComponent,

  ],
  providers: [
    LoginService
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
[x: string]: any;
  signupForm!: FormGroup<SignupForm>;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastService: ToastrService
  ){
    this.signupForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    }

  )
  }

  submit(){
    this.loginService.signup(this.signupForm.value.email, this.signupForm.value.password, this.signupForm.value.username).subscribe({
      next: () => this.toastService.success("Conta criada com sucesso!"),
    error: () => this.toastService.error("Dados incorretos!")})
  }

  navigate(){
    this.router.navigate(["/login"])
  }


}
