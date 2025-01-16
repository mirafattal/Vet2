import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map } from 'rxjs';

import { Menu } from '@core';
import { Token, User } from './interface';
import { APIClient, LoginRequestDto } from '@shared/services/api-client/veterinary-api.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private apiClient: APIClient) {

  }
  protected readonly http = inject(HttpClient);

  login(username: string, password: string, rememberMe = false) {
    return this.apiClient.login(new LoginRequestDto({username, password}));
  }

  refresh(params: Record<string, any>) {
    return this.http.post<Token>('/auth/refresh', params);
  }

  logout() {
    return this.http.post<any>('/auth/logout', {});
  }

  me() {
    return this.http.get<User>('/me');
  }

  menu() {
    return this.http.get<{ menu: Menu[] }>('/me/menu').pipe(map(res => res.menu));
  }
}
