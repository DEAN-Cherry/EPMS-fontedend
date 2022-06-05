import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { AppConfig } from '../../api/appconfig';
import { sequenceEqual, Subscription } from 'rxjs';
import { ConfigService } from '../../service/app.config.service';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { LoginService } from '../../service/login.service';
import { KeycloakProfile } from 'keycloak-js';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean = false;
  items!: MenuItem[];
  config!: AppConfig;
  subscription!: Subscription;
  public userProfile: KeycloakProfile | null = null;
  topBarMenuBackground: any;

  constructor(
    private readonly loginService: LoginService,
    public configService: ConfigService,
    public router: Router,
    private readonly keycloak: KeycloakService
  ) {}

  async ngOnInit() {
    this.items = [
      {
        label: '个人中心',
        icon: 'pi pi-fw pi-user',
        url: 'http://localhost:8085/realms/epms/account/',
      },
      { label: 'Remove User', icon: 'pi pi-fw pi-user-minus' },

      {
        separator: true,
      },
      {
        label: '登出',
        icon: 'pi pi-fw pi-sign-out',
        command: () => {
          this.logout();
        },
      },
    ];
    this.config = this.configService.getConfig();
    this.configService.applyScale();
    this.subscription = this.configService.configUpdate$.subscribe((config) => {
      this.config = config;
    });
    this.isLoggedIn = await this.keycloak.isLoggedIn();
    if (this.isLoggedIn) {
      this.userProfile = await this.keycloak.loadUserProfile();
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public login() {
    this.keycloak.login().then((_) => {});
  }

  public logout() {
    this.keycloak.logout().then((_) => {});
  }
}
