import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LandingComponent } from './components/landing/landing.component';
import { MainComponent } from './app.main.component';
import { LoginComponent } from './components/login/login.component';
import { KeycloakComponent } from './components/keycloak/keycloak.component';
import { SchoolComponent } from './components/internship_management/school/school.component';
import { ClassComponent } from './components/internship_management/class/class.component';
import { DashboardComponent } from './components/internship_management/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  {
    path: 'dashboard',
    component: MainComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'school', component: SchoolComponent },
      { path: 'class', component: ClassComponent },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'keycloak', component: KeycloakComponent },
  { path: 'app', component: AppComponent },
  // { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
    }),
  ],
  exports: [RouterModule],
  declarations: [],
})
export class AppRoutingModule {}
