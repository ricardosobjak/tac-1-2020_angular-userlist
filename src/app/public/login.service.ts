import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DEFAULT_API } from '../app.const';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  getHttpOption(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }

  public login = (username: string, password: string) => {
    const data = JSON.stringify({ email: username, password });

    return this.http.post(DEFAULT_API + 'login', data, {
      headers: this.getHttpOption(),
    });
  };
}
