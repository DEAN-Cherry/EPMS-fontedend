import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { AppConfig } from '../../api/appconfig';
import { sequenceEqual, Subscription } from 'rxjs';
import { ConfigService } from '../../service/app.config.service';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { LoginService } from '../../service/login.service';
import { KeycloakProfile } from 'keycloak-js';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit, OnDestroy {
  @Output() public isLoggedIn: boolean = false;
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
    this.config = this.configService.getConfig();
    this.configService.applyScale();
    this.subscription = this.configService.configUpdate$.subscribe((config) => {
      this.config = config;
    });
    this.isLoggedIn = await this.keycloak.isLoggedIn();
    this.userProfile = await this.keycloak.loadUserProfile();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public login() {
    this.keycloak.login().then((r) => {
      console.log(r);
    });
  }
}
