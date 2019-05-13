import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot  } from '@angular/router';
import 'rxjs-compat/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(private auth: AuthService, private router: Router) { }

  canActivate(route, state: RouterStateSnapshot) {
    // Retorna true se estiver logado e False se não estiver
      return this.auth.user$.map(user => {
      if (user) { return true; }

      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
    });
  }
}
