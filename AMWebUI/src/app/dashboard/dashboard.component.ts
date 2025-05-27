import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProviderService } from '../_services/provider.service';
import { LoadingScreenComponent } from '../partials/loading-screen/loading-screen.component';
import { ProviderDTO } from '../models/ProviderDTO';
import { Router } from '@angular/router';
import { CurrentStateService } from '../_services/current-state.service';
import { EMPTY, switchMap } from 'rxjs';
import { AppointmentService } from '../_services/appointment.service';
import { AppointmentDTO } from '../models/AppointmentDTO';

@Component({
  selector: 'am-dashboard',
  imports: [CommonModule, LoadingScreenComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  constructor(
    private providerService: ProviderService,
    private appointmentService: AppointmentService
  ) { }
  provider: ProviderDTO = new ProviderDTO();
  appointments: AppointmentDTO[] = [];
  loading = true;

  ngOnInit() {
    this.getProvider();
  }

  getProvider() {
    this.loading = true;
    this.providerService.getProviderAsync(false).pipe(
      switchMap((result) => {
        if (result === null) {
          this.loading = false;
          return EMPTY;
        }
        this.provider = result;
        return this.appointmentService.getUpcomingAppointmentsAsync();
      }),
    ).subscribe((result) => {
      if (result !== null) {
        this.appointments = result;
      }
      this.loading = false;
    });
  }
}
