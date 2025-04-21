import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SystemUnavailableComponent } from './partials/system-unavailable/system-unavailable.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UnauthorizedComponent } from './partials/unauthorized/unauthorized.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authorizationGuard } from './guards/authorization.guard';
import { ProviderProfileComponent } from './provider-profile/provider-profile.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'error', component: SystemUnavailableComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authorizationGuard],
  },
  {
    path: 'provider-profile',
    component: ProviderProfileComponent,
    canActivate: [authorizationGuard],
  },
];
