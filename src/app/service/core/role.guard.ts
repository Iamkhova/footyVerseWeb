import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute } from '@angular/router';
import { AngularFireAuth} from "angularfire2/auth";
import { AuthService} from "./auth.service";
import { UserAccountService} from "../userAccount/userAccount.service";
import { Observable} from "rxjs/internal/Observable";
import { map, take, tap} from 'rxjs/operators';

@Injectable()
export class RoleGuard implements CanActivate {

  data : string;
  uuid: string;

  constructor(private afAuth: AngularFireAuth, private authService: AuthService, private router: Router,
              private activatedRoute: ActivatedRoute, private userService : UserAccountService) {
    this.uuid = authService.currentUserId;
   // activatedRoute.data.subscribe((p) => {
   //   console.log('activated route', p);
   // });
  }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let roles = route.data["roles"] as Array<string>;
    return this.userService.checkForAccess(this.authService.currentUserId, roles );
  }
}
