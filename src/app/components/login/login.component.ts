import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { CommonMessage, AuthenticationClient } from '@authing/ng-ui-components';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  appId = '6265628d66dc6339228aa234';

  onLoad([e]: [AuthenticationClient]) {
    console.log('onLoad', e);
  }

  constructor() {}

  ngOnInit(): void {}
}
