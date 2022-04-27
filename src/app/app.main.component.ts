import { Component, Injectable, OnInit } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-main',
  templateUrl: './app.main.component.html',
  styleUrls: ['./app.main.component.scss'],
})
export class MainComponent implements OnInit {
  topMenuActive!: boolean;

  constructor() {}

  ngOnInit(): void {
    this.topMenuActive = false;
  }

  toggleMenu(event: Event) {
    console.log('toggleMenu', event);
  }

  toggleTopMenu(event: Event) {
    console.log('toggleTopMean', event);
  }
}
