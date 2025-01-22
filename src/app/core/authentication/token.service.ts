import { Injectable, OnDestroy, inject } from '@angular/core';
import { BehaviorSubject, Subject, Subscription, map, share, timer } from 'rxjs';

import { LocalStorageService } from '@shared';
import { currentTimestamp, filterObject } from './helpers';
import { Token } from './interface';
import { BaseToken } from './token';
import { TokenFactory } from './token-factory.service';
import { APIClient } from '@shared/services/api-client/veterinary-api.service';

@Injectable({
  providedIn: 'root',
})
export class TokenService implements OnDestroy {
  private readonly key = 'ng-matero-token';

  private readonly store = inject(LocalStorageService);
  private readonly factory = inject(TokenFactory);
  private readonly apiService = inject(APIClient);

  private readonly change$ = new BehaviorSubject<BaseToken | undefined>(undefined);
  private readonly refresh$ = new Subject<BaseToken | undefined>();

  private timer$?: Subscription;

  private _token?: BaseToken;

  private get token(): BaseToken | undefined {
    if (!this._token) {
      this._token = this.factory.create(this.store.get(this.key));
    }

    return this._token;
  }

  change() {
    return this.change$.pipe(share());
  }

  refresh() {
    this.buildRefresh();

    return this.refresh$.pipe(share());
  }

  set(token?: Token) {
    this.save(token);

    return this;
  }

  get(): BaseToken | undefined {
    return this.token; // Return the current token object
  }

  getUserId() {
    const token = this.get(); // Use the newly added `get` method
    return token?.user_ID; // Return the user_ID property
  }

  getRoles() {
    const token = this.get();
    return token?.Roles;
  }

  getUsername() {
    const token = this.get();
    return token?.Username;
  }

  getFullName() {
    const token = this.get();
    return token?.FullName;
  }

  getOwnerId() {
    const userId = this.getUserId();
    if (!userId) {
      throw new Error('User ID is not available.');
    }
    // Make an API call to get ownerId based on userId
    return this.apiService
      .getOwnerIdByUserId(userId) // Assuming you have a method in your API service
      .pipe(map((response: any) => response.ownerId));
  }

  clear() {
    this.save();
  }

  valid() {
    return this.token?.valid() ?? false;
  }

  getBearerToken() {
    return this.token?.getBearerToken() ?? '';
  }

  getRefreshToken() {
    return this.token?.refresh_token;
  }

  ngOnDestroy(): void {
    this.clearRefresh();
  }

  private save(token?: Token) {
    this._token = undefined;

    if (!token) {
      this.store.remove(this.key);
    } else {
      const value = Object.assign({ access_token: '', token_type: 'Bearer' }, token, {
        exp: token.expires_in ? currentTimestamp() + token.expires_in : null,
      });
      this.store.set(this.key, filterObject(value));
    }

    this.change$.next(this.token);
    this.buildRefresh();
  }

  private buildRefresh() {
    this.clearRefresh();

    if (this.token?.needRefresh()) {
      this.timer$ = timer(this.token.getRefreshTime() * 1000).subscribe(() => {
        this.refresh$.next(this.token);
      });
    }
  }

  private clearRefresh() {
    if (this.timer$ && !this.timer$.closed) {
      this.timer$.unsubscribe();
    }
  }

  public decodeToken(token: string): any {
    if (!token) return null;
    const tokenParts = token.split('.');
    if (tokenParts.length !== 3) return null;

    try {
      // Decode the payload part of the token (Base64URL)
      return JSON.parse(atob(tokenParts[1]));
    } catch (e) {
      console.error('Error decoding token', e);
      return null;
    }
  }
}
