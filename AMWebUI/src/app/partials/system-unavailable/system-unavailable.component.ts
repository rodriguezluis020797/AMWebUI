import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'am-system-unavailable',
  imports: [],
  templateUrl: './system-unavailable.component.html',
  styleUrl: './system-unavailable.component.css',
})
export class SystemUnavailableComponent {
  constructor(private router: Router) {}
  ngAfterViewInit() {
    // This will trigger after the view has been rendered
    // setTimeout(() => this.reRouteHome(), 0);
  }

  reRouteHome() {
    setTimeout(() => this.router.navigate(['']).then(() => {}), 2000);
  }
}
