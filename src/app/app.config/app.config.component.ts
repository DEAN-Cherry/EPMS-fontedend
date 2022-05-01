import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AppConfig } from '../api/appconfig';
import { MainComponent } from '../app.main.component';
import { AppComponent } from '../app.component';
import { ConfigService } from '../service/app.config.service';

@Component({
  selector: 'app-config',
  templateUrl: './app.config.component.html',
  styleUrls: ['./app.config.component.scss'],
})
export class ConfigComponent implements OnInit {
  scale: number = 14;

  scales: any[] = [12, 13, 14, 15, 16];

  config!: AppConfig;

  subscription!: Subscription;

  constructor(
    public app: AppComponent,
    public appMain: MainComponent,
    public configService: ConfigService,
    public primengConfig: PrimeNGConfig
  ) {
    this.primengConfig.ripple = <boolean>this.configService.config.ripple;
    this.scale = <number>this.configService.config.scale;
  }

  ngOnInit(): void {
    this.configService.applyScale();
    this.config = this.configService.config;
    this.subscription = this.configService.configUpdate$.subscribe((config) => {
      this.config = config;
      this.applyScale();
    });
  }

  applyScale() {
    this.config.scale = this.scale;
    document.documentElement.style.fontSize = this.scale + 'px';
  }

  onConfigButtonClick(event: { preventDefault: () => void }) {
    this.appMain.configActive = !this.appMain.configActive;
    this.appMain.configClick = true;
    event.preventDefault();
  }

  incrementScale() {
    this.scale++;
    this.applyScale();
  }

  decrementScale() {
    this.scale--;
    this.applyScale();
  }

  onRippleChange(ripple: any) {
    this.primengConfig.ripple = ripple;
    this.config.scale = this.scale;
    this.configService.updateConfig({
      ...this.config,
      ...{ ripple },
    });
  }

  onInputStyleChange() {
    this.configService.updateConfig(this.config);
  }

  changeTheme(theme: string, dark: boolean) {
    let themeElement: any = document.getElementById('theme-css');
    themeElement.setAttribute('href', 'assets/theme/' + theme + '/theme.css');
    this.configService.updateConfig({ ...this.config, ...{ theme, dark } });
  }

  ngOnDestroy() {
    this.configService.updateConfig(this.config);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
