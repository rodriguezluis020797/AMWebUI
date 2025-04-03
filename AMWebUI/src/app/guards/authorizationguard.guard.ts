import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthserviceService } from '../services/authservice.service';

export const authorizationguardGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthserviceService);

  return authService.isAuthenticated();
};
