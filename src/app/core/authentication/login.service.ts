import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

import { Menu } from '@core';
import { Token, User } from './interface';
import { APIClient, LoginRequestDto } from '@shared/services/api-client/veterinary-api.service';
import { NgxRolesService } from 'ngx-permissions';
import { permissionsOfRole } from 'app/app.component';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private apiClient: APIClient) {

  }
  protected readonly http = inject(HttpClient);
  private readonly rolesSrv = inject(NgxRolesService);

  login(username: string, password: string, rememberMe = false) {
    return this.apiClient.authh(new LoginRequestDto({username, password}));
  }

  refresh(params: Record<string, any>) {
    return this.http.post<Token>('/auth/refresh', params);
  }

  logout() {
    return this.http.post<any>('/auth/logout', {});
  }

  me() {
    var user = JSON.parse(localStorage.getItem('ng-matero-token')!);
    var u: User = {
      id: user[user['user_ID']],
      name: user[user['user_ID']],
      roles:user['Roles'],
      permissions:[''],
      email: 'nsfds',
      avatar: 'images/avatar.jpg',

    };

    return new BehaviorSubject<User>(u);
  }

  menu() {
    var currentPermissions: string[] = [];
    var user = JSON.parse(localStorage.getItem('ng-matero-token')!);

    var currentRole = user['Roles'];
    currentPermissions = permissionsOfRole[currentRole];
    this.rolesSrv.flushRolesAndPermissions();
    this.rolesSrv.addRoleWithPermissions(currentRole, currentPermissions);

    return this.http.get<{ menu: Menu[] }>('/me/menu').pipe(map(res => res.menu));
  }
}
