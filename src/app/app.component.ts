import { Component } from '@angular/core';
import { CommonMessage, AuthenticationClient } from '@authing/ng-ui-components';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  menuMode = 'static';
  title = 'demo';
  appId = '626e262cbed45d0f522be234';
  visible: boolean = true;

  constructor(private primeNGConfig: PrimeNGConfig) {}

  ngOnInit() {
    this.primeNGConfig.ripple = true;
  }

  onLoad([e]: [AuthenticationClient]) {
    console.log('onLoad', e);
  }
}
