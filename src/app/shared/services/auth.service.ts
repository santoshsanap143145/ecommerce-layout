import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IlogIn, IsignIn } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  AUTH_URL: string = `${environment.authUrl}`;
  constructor(private _http: HttpClient, private _router: Router) {}


  //Register User (sign up)

  signIn(userDetail: IsignIn): Observable<any> {
    return this._http.post<any>(
      `${this.AUTH_URL}/api/auth/register`,
      userDetail
    );
  }

  //Log in User

  login(userDetail: IlogIn): Observable<any> {
    let LOGIN_URL = `${this.AUTH_URL}/api/auth/login`;
    return this._http.post<any>(LOGIN_URL, userDetail);
  }

  // save token and useRole in local storage

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }
  saveUserRole(userRole: string) {
    localStorage.setItem('userRole', userRole);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    this._router.navigate(['']);
  }
}
