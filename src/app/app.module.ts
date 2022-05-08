import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppTopBarComponent } from './app-topbar/app-topbar.component';
import { MainComponent } from './app.main.component';
import { MenuComponent } from './app.menu.component';
import { MenuModule } from 'primeng/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuItemComponent } from './app.menu-item.component';
import { ConfigComponent } from './app.config/app.config.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { LandingComponent } from './components/landing/landing.component';
import { DividerModule } from 'primeng/divider';
import { StyleClassModule } from 'primeng/styleclass';
import { LoginComponent } from './components/login/login.component';
import { GuardModule } from '@authing/ng-ui-components';
import { KeycloakComponent } from './components/keycloak/keycloak.component';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { initializeKeycloak } from './api/keycloak-init';
import { AvatarModule } from 'primeng/avatar';

// function initializeKeycloak(keycloak: KeycloakService) {
//   return () =>
//     keycloak.init({
//       config: {
//         url: 'http://localhost:8085',
//         realm: 'epms',
//         clientId: 'epms-client',
//       },
//       bearerExcludedUrls: ['/assets', 'clients/public'],
//       initOptions: {
//         onLoad: 'check-sso',
//         silentCheckSsoRedirectUri:
//           window.location.origin + '/assets/silent-check-sso.html',
//       },
//     });
// }

@NgModule({
  declarations: [
    AppComponent,
    AppTopBarComponent,
    MainComponent,
    MenuComponent,
    MenuItemComponent,
    ConfigComponent,
    LandingComponent,
    LoginComponent,
    KeycloakComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    GuardModule,
    MenuModule,
    RadioButtonModule,
    InputSwitchModule,
    FormsModule,
    ButtonModule,
    RippleModule,
    DividerModule,
    StyleClassModule,
    KeycloakAngularModule,
    AvatarModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
