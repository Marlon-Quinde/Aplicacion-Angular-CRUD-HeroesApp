import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, of, map, catchError } from 'rxjs';

import { environments } from 'src/environments/environments';

import { User } from '../interfaces/user.interfaces';

@Injectable({providedIn: 'root'})
export class AuthService {

    private baseUrl = environments.baseUrl;
    private user?: User;

    constructor(private http: HttpClient) { }
    
    get currentUser():User|undefined{
        if(!this.user) return undefined;
        return structuredClone(this.user)
    }

    login(email: string, password: string): Observable<User>{
        return this.http.get<User>(`${this.baseUrl}/users/1`)
            .pipe(
                tap( user => this.user = user),
                tap( user => localStorage.setItem('token', 'sdfdasdadfaASFAAS'))
            )
    }

    checkAuthentication(): Observable<boolean>{
        if (!localStorage.getItem('token')) return of(false)
        const token = localStorage.getItem('token');

        return this.http.get<User>(`${this.baseUrl}/users/1`)
            .pipe(
                tap( user => this.user = user),
                map( user => !!user ),
                catchError( err => of(false))
            )
    }

    Logout(){
        this.user = undefined;
        localStorage.clear();
    }    
}