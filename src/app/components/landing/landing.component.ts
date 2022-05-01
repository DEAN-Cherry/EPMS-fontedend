import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppConfig } from '../../api/appconfig';
import { Subscription } from 'rxjs';
import { ConfigService } from '../../service/app.config.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit, OnDestroy {
  config!: AppConfig;
  subscription!: Subscription;
  topBarMenuBackground: any;
  isProfileHidden: boolean = false;

  constructor(public configService: ConfigService, public router: Router) {}

  ngOnInit(): void {
    this.config = this.configService.getConfig();
    this.configService.applyScale();
    this.subscription = this.configService.configUpdate$.subscribe((config) => {
      this.config = config;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
