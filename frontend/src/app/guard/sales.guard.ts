import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SalesGuard implements CanActivate {
  constructor(private toastr: ToastrService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let user = localStorage.getItem('loginUser')
      ? JSON.parse(localStorage.getItem('loginUser'))
      : JSON.parse(sessionStorage.getItem('loginUser'));
    if (user.acc_type == 3) {
      return true;
    } else {
      this.toastr.error(
        'You do not have permission to access this route, you need super admin account for that'
      );
      this.router.navigate(['/dashboard']);
      return false;
    }
  }
}
