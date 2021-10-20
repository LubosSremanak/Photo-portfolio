import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree,} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from "rxjs/operators";
import {UsersService} from "../../../api/user/users.service";

@Injectable({
  providedIn: 'root',
})
export class ContentManagementGuard implements CanActivate {
  constructor(private usersService: UsersService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.usersService.isLogged().pipe(map((result: any) => {
      if (!result.isLogged) {
        this.router.navigate(['admin'])
      }
      return result.isLogged;
    }));
  }
}
