import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SystemUnavailableComponent } from './partials/system-unavailable/system-unavailable.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { UnauthorizedComponent } from './partials/unauthorized/unauthorized.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authorizationGuard } from './guards/authorization.guard';
import { ProviderProfileComponent } from './provider-profile/provider-profile.component';
import { VerifyEMailComponent } from './partials/verify-email/verify-email.component';
import { ResetEMailComponent } from './reset-email/reset-email.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { CompleteSignUpComponentn } from './complete-sign-up/complete-sign-up.component';
import { ServicesComponent } from './services/services.component';
import { ClientComponent } from './client/client.component';
import { AppointmentsComponent } from './appointments/appointments.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'error', component: SystemUnavailableComponent },
  { path: 'update-password', component: UpdatePasswordComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: 'verify-email', component: VerifyEMailComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authorizationGuard],
  },
  {
    path: 'reset-email',
    component: ResetEMailComponent,
    canActivate: [authorizationGuard],
  },
  {
    path: 'provider-profile',
    component: ProviderProfileComponent,
    canActivate: [authorizationGuard],
  },
  {
    path: 'complete-sign-up',
    component: CompleteSignUpComponentn,
    canActivate: [authorizationGuard],
  },
  {
    path: 'services',
    component: ServicesComponent,
    canActivate: [authorizationGuard]
  },
  {
    path: 'clients',
    component: ClientComponent,
    canActivate: [authorizationGuard]
  },
  {
    path: 'appointments',
    component: AppointmentsComponent,
    canActivate: [authorizationGuard]
  }
];