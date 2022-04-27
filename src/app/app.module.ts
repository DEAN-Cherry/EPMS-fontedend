import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppTopBarComponent } from './app-topbar/app-topbar.component';
import { GuardModule } from '@authing/ng-ui-components';
import { MainComponent } from './app.main.component';
import { MenuComponent } from './app.menu.component';
import { MenuModule } from 'primeng/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuItemComponent } from './app.menu-item.component';
import { ConfigComponent } from './app.config/app.config.component';

@NgModule({
  declarations: [
    AppComponent,
    AppTopBarComponent,
    MainComponent,
    MenuComponent,
    MenuItemComponent,
    ConfigComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    GuardModule,
    MenuModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
