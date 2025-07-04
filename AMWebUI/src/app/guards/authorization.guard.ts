import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { CurrentStateService } from '../_services/current-state.service';
import { Router } from '@angular/router';
import { AccountStatusEnum } from '../models/Enums';

export const authorizationGuard: CanActivateFn = (route, state) => {
  const currentStateService = inject(CurrentStateService);
  const router = inject(Router);

  if (currentStateService.loggedInSubject.value) {
    return true;
  } else {
    router.navigate(['/unauthorized']);
    return false;
  }
};
