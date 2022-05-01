import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AppConfig } from '../api/appconfig';
import { PrimeNGConfig } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  config: AppConfig = {
    theme: 'bootstrap4-light-blue',
    dark: false,
    inputStyle: 'outlined',
    ripple: true,
    scale: 14,
  };

  private configUpdate = new Subject<AppConfig>();

  configUpdate$ = this.configUpdate.asObservable();

  updateConfig(config: AppConfig) {
    this.config = config;
    this.configUpdate.next(config);
  }

  getConfig() {
    return this.config;
  }

  applyScale() {
    document.documentElement.style.fontSize = this.config.scale + 'px';
  }

  isDesktop() {
    return window.innerWidth > 992;
  }

  isMobile() {
    return window.innerWidth < 1024;
  }
}
