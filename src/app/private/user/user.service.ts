import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DEFAULT_API } from 'src/app/app.const';
import { UserListResponse } from './user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  public getUsers = (
    page?: number,
    perPage?: number
  ): Observable<UserListResponse> => {
    let params = [];
    if (page) params = params.concat(`page=${page}`);
    if (perPage) params = params.concat(`per_page=${perPage}`);

    return this.http.get<UserListResponse>(
      DEFAULT_API + 'users' + (params.length > 0 ? '?' + params.join('&') : '')
    );
  };
}
