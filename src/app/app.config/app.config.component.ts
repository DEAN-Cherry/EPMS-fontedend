import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AppConfig } from '../api/appconfig';
import { MainComponent } from '../app.main.component';

@Component({
  selector: 'app-app.config',
  templateUrl: './app.config.component.html',
  styleUrls: ['./app.config.component.scss'],
})
export class ConfigComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
