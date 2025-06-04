import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProviderService } from '../_services/provider.service';
import { LoadingScreenComponent } from '../partials/loading-screen/loading-screen.component';
import { ProviderDTO } from '../models/ProviderDTO';
import { AppointmentDTO } from '../models/AppointmentDTO';
import { AppointmentService } from '../_services/appointment.service';
import { EMPTY, switchMap } from 'rxjs';

@Component({
  selector: 'am-dashboard',
  standalone: true,
  imports: [CommonModule, LoadingScreenComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  provider: ProviderDTO = new ProviderDTO();
  appointments: AppointmentDTO[] = [];
  loading = true;

  constructor(
    private providerService: ProviderService,
    private appointmentService: AppointmentService
  ) { }

  ngOnInit(): void {
    this.loadDashboardData();
  }

  private loadDashboardData(): void {
    this.loading = true;

    this.providerService.getProviderAsync(false).pipe(
      switchMap((provider) => {
        if (!provider) {
          this.loading = false;
          return EMPTY;
        }

        this.provider = provider;
        return this.appointmentService.getUpcomingAppointmentsAsync();
      })
    ).subscribe({
      next: (appointments) => {
        if (appointments) {
          this.appointments = appointments;
        }
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}