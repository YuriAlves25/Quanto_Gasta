import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  apiUrl: string = "http://localhost:8080/auth";





  public isTokenValid() {
    const token = localStorage.getItem('auth-token');
     const headers = token ? new HttpHeaders({ 'Authorization': `Bearer ${token}` }) : undefined;

    
    return this.httpClient.get<boolean>(this.apiUrl, { headers, observe: 'response' }).pipe(
      map(response => response.status === 200),
      catchError(() => of(false))
    );

  }
}
