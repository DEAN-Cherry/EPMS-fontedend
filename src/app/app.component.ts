import { Component } from '@angular/core';
import { CommonMessage, AuthenticationClient } from '@authing/ng-ui-components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  menuMode = 'static';
  title = 'demo';
  appId = '6265628d66dc6339228aa234';

  onLoad([e]: [AuthenticationClient]) {
    console.log('onLoad', e);
  }
}
