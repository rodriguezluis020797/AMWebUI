import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { CurrentStateService } from '../services/current-state.service';
import { Router } from '@angular/router';

export const authorizationGuard: CanActivateFn = (route, state) => {
  const currentStateService = inject(CurrentStateService);
  const router = inject(Router);

  if (currentStateService.isLoggedIn$) {
    return true;
  } else {
    router.navigate(['/unauthorized']);
    return false;
  }
};
