import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../types/Login-response.type';
import { tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})


export class LoginService {

apiUrl: string = "http://localhost:8080/auth"



  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  login( email: string, password: string) {
    return this.httpClient.post<LoginResponse>(this.apiUrl + "/login", { email, password}).pipe(tap((value) => {
      
      localStorage.setItem("auth-token", value.token);

      })
    )
  }

  signup( email: string, password: string, username: string) {
    return this.httpClient.post<LoginResponse>(this.apiUrl + "/register", { email, password, username}).pipe(tap((value) => {
      localStorage.setItem("auth-token", value.token)

      })
    )
  }

}
