import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { IdentityService } from '../services/identity.service';
import { switchMap } from 'rxjs';

export const identityPingInterceptor: HttpInterceptorFn = (req, next) => {
  const identityService = inject(IdentityService);
  if (req.url.endsWith('/api/Identity/Ping')) {
    return next(req); // Prevent loop
  }

  return identityService.pingAsync().pipe(switchMap(() => next(req)));
};
