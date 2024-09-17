import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard2 implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {}
//Verifica se o usuário possui um token valido, se sim manda ele para a pagina principal do app
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.authService.isTokenValid().pipe(
      map(isValid => {
        if (isValid) {
          this.router.navigate(['/expenses']);
          return false;
        } else {
          return true;
        }
      }),
      catchError(() => of(true))
    );
  }
}
