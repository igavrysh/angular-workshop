import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  model = 'auth/login';
  isAuthenticated$ = new BehaviorSubject(false);

  constructor(private http: HttpClient) { 
    this.setToken(this.getToken());
  }

  getUrl() {
    return `${environment.apiEndpoint}${this.model}`;
  }

  login(email, password) {
    return this.http.post(this.getUrl(), { email, password });
  }

  logout() {
    this.setToken('');
  }

  // TOKEN
  setToken(token) {
    localStorage.setItem('token', token);
    this.isAuthenticated$.next(token !== '');
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
