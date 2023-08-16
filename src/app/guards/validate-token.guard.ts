import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { CanActivate, CanLoad, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ValidateTokenGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): Observable<boolean> | boolean {
    return this.authService.validateToken()
      .pipe(
        tap(valid => {
          if (!valid) this.router.navigateByUrl('/auth');
        })
      );
  }
  canLoad(): Observable<boolean> | boolean {
    return this.authService.validateToken()
      .pipe(
        tap(valid => {
          if (!valid) this.router.navigateByUrl('/auth');
        })
      );
  }
}
