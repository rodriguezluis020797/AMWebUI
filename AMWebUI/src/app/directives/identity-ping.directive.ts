import { Directive, HostListener } from '@angular/core';
import { IdentityService } from '../services/identity.service';

@Directive({
  selector: '[amIdentityPing]',
  standalone: true,
})
export class IdentityPingDirective {
  constructor(private identityService: IdentityService) {}

  @HostListener('click')
  onClick(): void {
    this.identityService.pingAsync().subscribe({
      next: () => {
        console.log('Ping sent successfully from directive');
      },
      error: (err) => {
        console.error('Ping failed', err);
      },
    });
  }
}
