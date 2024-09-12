import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,private authService: AuthService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const authToken = localStorage.getItem('auth-token');

      if(authToken == null){
        console.log("esse é o token: " + authToken)
        this.router.navigate(['/login']);

      }

      return this.authService.isTokenValid().pipe(
        map(isValid => {
          if (isValid) {

            return true;
          } else {

            this.router.navigate(['/login']);
            return false;
          }
        }),
        catchError(() => {

          this.router.navigate(['/login']);
          return of(false);
        })
      );
    }
}
