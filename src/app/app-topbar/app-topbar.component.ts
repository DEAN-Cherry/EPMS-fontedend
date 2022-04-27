import { Component, OnInit } from '@angular/core';
import { MainComponent } from '../app.main.component';

@Component({
  selector: 'app-top-bar',
  templateUrl: './app-topbar.component.html',
  styleUrls: ['./app-topbar.component.scss'],
})
export class AppTopBarComponent implements OnInit {
  constructor(public appMain: MainComponent) {}

  ngOnInit(): void {}
}
