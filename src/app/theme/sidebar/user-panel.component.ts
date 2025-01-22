import { Component, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { AuthService, TokenService, User } from '@core/authentication';
import { TranslateModule } from '@ngx-translate/core';
import { APIClient, UserDto, UserDtoApiResponse } from '@shared/services/api-client/veterinary-api.service';

@Component({
  selector: 'app-user-panel',
  template: `
    <div class="matero-user-panel" routerLink="/profile/overview">
      <img class="matero-user-panel-avatar" [src]="'images/heros/5.jpg'" alt="avatar" width="64" />
      <div class="matero-user-panel-info">
        <h4>{{ myuser?.fullName }}</h4>
        <h5>{{ myuser?.email }}</h5>
      </div>
    </div>
  `,
  styleUrl: './user-panel.component.scss',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatIconModule, MatTooltipModule, TranslateModule],
})
export class UserPanelComponent implements OnInit {
  private readonly auth = inject(AuthService);
  private readonly tokenService = inject(TokenService);
  private readonly apiService = inject(APIClient);

  myuser: UserDto | null = null; // Define the user type or interface

  //user!: User;

  ngOnInit(): void {

    const userId = this.tokenService.getUserId();
    if (userId) {
      // Fetch user data from backend based on userId
      this.apiService.getById15(userId).subscribe(
        (userData: UserDtoApiResponse) => {
          this.myuser = userData.data!;  // Assuming the response contains 'user' property with the data
        },
        (error) => {
          console.error('Error fetching user data:', error);
        }
      );
    }

   // this.auth.user().subscribe(user => (this.user = user));
  }
}
