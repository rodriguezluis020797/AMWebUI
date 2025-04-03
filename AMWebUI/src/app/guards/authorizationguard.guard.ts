import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookiesService } from '../services/cookies.service';
import { CookieEnum } from '../../models/Enums';

export const authorizationguardGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookiesService);
  const routerService = inject(Router);

  if (!cookieService.getCookie(CookieEnum.JWT.toString())) {
    cookieService.deleteAllCookies();
    routerService.navigate(['']);
    return false;
  }
  return true;
};
