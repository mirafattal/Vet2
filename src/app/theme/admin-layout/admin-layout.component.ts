import { BidiModule } from '@angular/cdk/bidi';
import { BreakpointObserver } from '@angular/cdk/layout';
import {
  Component,
  HostBinding,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { MatSidenav, MatSidenavContent, MatSidenavModule } from '@angular/material/sidenav';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NgProgressbar } from 'ngx-progressbar';
import { NgProgressRouter } from 'ngx-progressbar/router';
import { Subscription, filter } from 'rxjs';

import { AppSettings, AuthService, BaseToken, SettingsService, TokenService } from '@core';
import { CustomizerComponent } from '../customizer/customizer.component';
import { HeaderComponent } from '../header/header.component';
import { SidebarNoticeComponent } from '../sidebar-notice/sidebar-notice.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopmenuComponent } from '../topmenu/topmenu.component';
import { NgxRolesService } from 'ngx-permissions';
import { permissionsOfRole } from 'app/app.component';
import { CommonModule } from '@angular/common';
import { MyAuthService } from 'app/routes/my-login/my-auth-service/my-auth.service';

const MOBILE_MEDIAQUERY = 'screen and (max-width: 599px)';
const TABLET_MEDIAQUERY = 'screen and (min-width: 600px) and (max-width: 959px)';
const MONITOR_MEDIAQUERY = 'screen and (min-width: 960px)';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    RouterOutlet,
    BidiModule,
    MatSidenavModule,
    NgProgressbar,
    NgProgressRouter,
    HeaderComponent,
    TopmenuComponent,
    SidebarComponent,
    SidebarNoticeComponent,
    CustomizerComponent,
    CommonModule
  ],
})
export class AdminLayoutComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav', { static: true }) sidenav!: MatSidenav;
  @ViewChild('content', { static: true }) content!: MatSidenavContent;

  private readonly breakpointObserver = inject(BreakpointObserver);
  private readonly router = inject(Router);
  private readonly settings = inject(SettingsService);
  private readonly rolesSrv = inject(NgxRolesService);
  private readonly tokenService = inject(TokenService);

  options = this.settings.options;

  get themeColor() {
    return this.settings.getThemeColor();
  }

  get isOver() {
    return this.isMobileScreen;
  }

  private isMobileScreen = false;

  @HostBinding('class.matero-content-width-fix')
  get contentWidthFix() {
    return (
      this.isContentWidthFixed &&
      this.options.navPos === 'side' &&
      this.options.sidenavOpened &&
      !this.isOver
    );
  }

  private isContentWidthFixed = true;

  @HostBinding('class.matero-sidenav-collapsed-fix')
  get collapsedWidthFix() {
    return (
      this.isCollapsedWidthFixed &&
      (this.options.navPos === 'top' || (this.options.sidenavOpened && this.isOver))
    );
  }

  private isCollapsedWidthFixed = false;

  private layoutChangesSubscription = Subscription.EMPTY;

  constructor() {
    this.layoutChangesSubscription = this.breakpointObserver
      .observe([MOBILE_MEDIAQUERY, TABLET_MEDIAQUERY, MONITOR_MEDIAQUERY])
      .subscribe(state => {
        // SidenavOpened must be reset true when layout changes
        this.options.sidenavOpened = true;

        this.isMobileScreen = state.breakpoints[MOBILE_MEDIAQUERY];
        this.options.sidenavCollapsed = state.breakpoints[TABLET_MEDIAQUERY];
        this.isContentWidthFixed = state.breakpoints[MONITOR_MEDIAQUERY];
      });

    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(e => {
      if (this.isOver) {
        this.sidenav.close();
      }
      this.content.scrollTo({ top: 0 });
    });
  }
  ngOnInit(): void {
   var user = JSON.parse(localStorage.getItem('ng-matero-token')!);

   const token: BaseToken = this.tokenService.get()!; // Assuming you get the BaseToken
console.log('Token:', token);

if (token?.access_token) {
  // Decode the access token (this should only decode the JWT string)
  const decodedToken: any = this.tokenService.decodeToken(token.access_token); // Decode the access_token
  console.log('Decoded Token:', decodedToken);

  // Access the 'Roles' from token.attributes (not directly from the token)
  if (token?.attributes?.Roles) {
    // If Roles is a string, convert it to an array
    this.roles = Array.isArray(token.attributes.Roles) ? token.attributes.Roles : [token.attributes.Roles];
  } else {
    this.roles = [];
  }

  console.log('Roles:', this.roles);
} else {
  console.log('No token found');
  this.roles = [];
}



    var currentPermissions: string[] = [];
    var currentRole = user['Roles'];
    currentPermissions = permissionsOfRole[currentRole];
    this.rolesSrv.flushRolesAndPermissions();
    this.rolesSrv.addRoleWithPermissions(currentRole, currentPermissions);  }

  ngOnDestroy() {
    this.layoutChangesSubscription.unsubscribe();
  }

  toggleCollapsed() {
    this.isContentWidthFixed = false;
    this.options.sidenavCollapsed = !this.options.sidenavCollapsed;
    this.resetCollapsedState();
  }

  // TODO: Trigger when transition end
  resetCollapsedState(timer = 400) {
    setTimeout(() => this.settings.setOptions(this.options), timer);
  }

  onSidenavClosedStart() {
    this.isContentWidthFixed = false;
  }

  onSidenavOpenedChange(isOpened: boolean) {
    this.isCollapsedWidthFixed = !this.isOver;
    this.options.sidenavOpened = isOpened;
    this.settings.setOptions(this.options);
  }

  updateOptions(options: AppSettings) {
    this.options = options;
    this.settings.setOptions(options);
    this.settings.setDirection();
    this.settings.setTheme();
  }

  roles: string[] = [];

  isAdmin(): boolean {
    return this.roles.includes('ADMIN'); // Return true if the user has the 'admin' role
  }

  isGuest(): boolean {
    return this.roles.includes('GUEST'); // Check if the user has the 'guest' role
  }

  toggleSidenav() {
    this.sidenav.toggle();
  }
}
