import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { Observable, tap, map } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({providedIn: 'root'})

export class PublicGuard implements CanMatch, CanActivate{

    constructor(private authService: AuthService,
                private router: Router) { }
    
    private checkAuthStatus(): Observable<boolean>{
        return this.authService.checkAuthentication()
        .pipe(
            tap( isAuthenticated => {
                if (isAuthenticated) {
                    this.router.navigate(['./'])
                }
            }),
            map( isAuthenticated => !isAuthenticated )
        );;
    }

    canMatch(route: Route, segments: UrlSegment[]): boolean | Observable<boolean >{
        return this.checkAuthStatus();
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean > {
        return this.checkAuthStatus();
    }
}