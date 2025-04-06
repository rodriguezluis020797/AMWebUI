import { CanActivateFn } from '@angular/router';

export const authorizationguardGuard: CanActivateFn = (route, state) => {
  return true;
};
