import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { HttpClient } from '@angular/common/http';

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

  constructor(private primeNGConfig: PrimeNGConfig, private http: HttpClient) {}

  ngOnInit() {
    this.primeNGConfig.ripple = true;
  }
}
