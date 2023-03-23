import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../authentication-service/authentication.service';

const defaultPath = '/';

@Injectable()
export class AuthenticationGuard implements CanActivate {
    constructor(private router: Router, private authService: AuthenticationService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const isLoggedIn = this.authService.loggedIn;
        const isAuthForm = [
            'sign-in',
            'reset-password',
            'create-account',
            'change-password/:recoveryCode'
        ].includes(route.routeConfig.path);

        if (isLoggedIn && isAuthForm) {
            this.router.navigate([defaultPath]);
            return false;
        }

        if (!isLoggedIn && !isAuthForm) {
            this.authService.requestedPath = state.url;
            this.router.navigate(['/sign-in']);
        }

        return isLoggedIn || isAuthForm;
    }
}