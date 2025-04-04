import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SystemUnavailableComponent } from './partials/system-unavailable/system-unavailable.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { authorizationguardGuard } from './guards/authorizationguard.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'error', component: SystemUnavailableComponent },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
    canActivate: [authorizationguardGuard],
  },
];
