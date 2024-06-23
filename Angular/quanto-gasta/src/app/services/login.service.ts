import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../types/Login-response.type';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  login(email: string, password: string) {
    return this.httpClient.post<LoginResponse>("", { email, password}).pipe(tap((value) => {
      sessionStorage.setItem("auth-token", value.token)
      })
    )
  }

}
