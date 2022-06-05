import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  appId = '626e262cbed45d0f522be234';
  visible: boolean = true;

  constructor() {}

  ngOnInit(): void {}
}
