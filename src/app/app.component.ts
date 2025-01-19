import { Component, OnInit, AfterViewInit, inject } from '@angular/core';
import { PreloaderService, SettingsService } from '@core';
import { RouterOutlet } from '@angular/router';
import { NgxRolesService } from 'ngx-permissions';
export const permissionsOfRole: Record<string, string[]> = {
  ADMIN: ['canAdd', 'canDelete', 'canEdit', 'canRead'],
  MANAGER: ['canAdd', 'canEdit', 'canRead'],
  GUEST: ['canRead'],
};

@Component({
  selector: 'app-root',
  template: `<router-outlet />`,
  standalone: true,
  imports: [RouterOutlet],
})

export class AppComponent implements OnInit, AfterViewInit {
  private readonly preloader = inject(PreloaderService);
  private readonly settings = inject(SettingsService);
  private readonly rolesSrv = inject(NgxRolesService);

  ngOnInit() {
    this.settings.setDirection();
    this.settings.setTheme();

    var user = JSON.parse(localStorage.getItem('ng-matero-token')!);

    var currentPermissions: string[] = [];
    var currentRole = user['Roles'];
    currentPermissions = permissionsOfRole[currentRole];
    this.rolesSrv.flushRolesAndPermissions();
    this.rolesSrv.addRoleWithPermissions(currentRole, currentPermissions);

  }

  ngAfterViewInit() {
    this.preloader.hide();
  }
}
