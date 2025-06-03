import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppointmentDTO } from '../models/AppointmentDTO';
import { LoadingScreenComponent } from '../partials/loading-screen/loading-screen.component';
import { DeleteEntityComponent } from '../partials/delete-entity/delete-entity.component';
import { AppointmentService } from '../_services/appointment.service';
import { AppointmentStatusPipe } from "../pipes/appointment-status.pipe";
import { ClientDTO } from '../models/ClientDTO';
import { ClientService } from '../_services/client.service';
import { EMPTY, switchMap } from 'rxjs';
import { ServiceService } from '../_services/service.service';
import { ServiceDTO } from '../models/ServiceDTO';
import { AppointmentStatusEnum } from '../models/Enums';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'am-appointments',
  standalone: true,
  imports: [FormsModule, CommonModule, LoadingScreenComponent, DeleteEntityComponent, AppointmentStatusPipe, MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatButtonModule],
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.css'
})
export class AppointmentsComponent implements OnInit {
  editDTO: AppointmentDTO = new AppointmentDTO();
  editAppointmentBool: boolean = false;
  isNewAppointment: boolean = false;
  loading: boolean = true;
  showDeleteModal: boolean = false;
  pendingDeleteId: string | null = null;
  servicePrice: number = 0;
  AppointmentStatusEnum = AppointmentStatusEnum;

  appointments: (AppointmentDTO & { clientName?: string, serviceName?: string })[] = [];
  clients: ClientDTO[] = [];
  clientName: string | null = null;
  services: ServiceDTO[] = [];
  originalServicePrice: number = 0;
  timeEditDTO = {
    startDateOnly: '',  // yyyy-MM-dd
    startTimeOnly: '',  // HH:mm
    endDateOnly: '',
    endTimeOnly: ''
  };

  constructor(private appointmentService: AppointmentService,
    private clientService: ClientService,
    private serviceService: ServiceService) { }

  ngOnInit(): void {
    this.loading = true;
    this.appointmentService
      .getAllAppointmentsAsync().pipe(
        switchMap((result) => {
          if (result === null) {
            this.loading = false;
            return EMPTY;
          }
          this.appointments = result;
          return this.clientService.getClientsAsync();
        }),
        switchMap((result) => {
          if (result === null) {
            this.loading = false;
            return EMPTY;
          }
          this.clients = result;
          return this.serviceService.getServicesAsync();
        })
      ).subscribe((result) => {
        if (result === null) {
          this.loading = false;
          return;
        }
        this.services = result;
        this.mapClientAndServiceNames();
      });
  }

  get selectedServiceName(): string {
    const match = this.services.find(s => s.serviceId === this.editDTO?.serviceId);
    return match ? match.name : '—';
  }

  onServiceChange() {
    this.loading = true;
    this.editDTO.overridePrice = false;
    const serviceDto = new ServiceDTO();
    serviceDto.serviceId = this.editDTO.serviceId;

    this.serviceService
      .getServicePriceAsync(serviceDto)
      .subscribe((result) => {
        if (result == null) {
          this.loading = false;
          return;
        }
        this.editDTO.price = result.price;
        this.originalServicePrice = this.editDTO.price;
        this.loading = false;
      });
  }

  onOverridePrice() {
    if (this.editDTO.overridePrice) {
      this.servicePrice = 0;
    }
    else {
      this.editDTO.price = this.services.find(x => x.serviceId === this.editDTO.serviceId)?.price ?? 0;
    }
  }

  mapClientAndServiceNames() {
    for (const appointment of this.appointments) {
      const client = this.clients.find(c => c.clientId === appointment.clientId);
      const service = this.services.find(s => s.serviceId === appointment.serviceId);

      appointment.clientName = client
        ? `${client.firstName} ${client.middleName ?? ''} ${client.lastName}`.trim().replace(/\s+/g, ' ')
        : 'Unknown Client';

      appointment.serviceName = service ? service.name : 'Unknown Service';
    }

    this.loading = false;
  }

  getAppointments() {
    this.loading = true;
    this.appointmentService.getAllAppointmentsAsync().subscribe(
      (result) => {
        if (result === null) {
          this.loading = false;
          return;
        }
        this.appointments = result;
        this.loading = false;
      })
  }

  addAppointment() {
    this.loading = true;

    const now = new Date();

    // Round UP to the next 30-minute increment
    const minutes = now.getMinutes();
    const remainder = 30 - (minutes % 30);
    const adjustedMinutes = (minutes + remainder) % 60;
    now.setMinutes(adjustedMinutes);
    now.setSeconds(0);
    now.setMilliseconds(0);

    if (minutes + remainder >= 60) {
      now.setHours(now.getHours() + 1);
      now.setMinutes(0);
    }

    const end = new Date(now);
    end.setHours(end.getHours() + 1);

    this.editDTO = new AppointmentDTO();
    this.editDTO.startDate = this.formatDateLocal(now); // Local format for datetime-local input
    this.editDTO.endDate = this.formatDateLocal(end);

    this.editAppointmentBool = true;
    this.isNewAppointment = true;
    this.loading = false;
  }

  // Helper to format date as yyyy-MM-ddTHH:mm
  private formatDateLocal(date: Date): string {
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  }

  editAppointment(appointmentId: string) {
    this.loading = true;
    this.isNewAppointment = false;
    this.editAppointmentBool = true;

    const appt = this.appointments.find(x => x.appointmentId === appointmentId);
    if (!appt) return;

    // Clone and reformat
    this.editDTO = new AppointmentDTO();
    Object.assign(this.editDTO, appt);

    this.editDTO.startDate = this.formatDateLocal(new Date(appt.startDate));
    this.editDTO.endDate = this.formatDateLocal(new Date(appt.endDate));

    const client = this.clients.find(x => x.clientId === this.editDTO.clientId);
    this.clientName = client
      ? `${client.firstName} ${client.middleName ?? ''} ${client.lastName}`.trim().replace(/\s+/g, ' ')
      : 'Unknown Client';
    this.loading = false;

  }

  save() {
    this.loading = true;
    this.editDTO.errorMessage = null;
    this.editDTO.status = Number(this.editDTO.status);

    if (this.editDTO.overridePrice) {
      (this.editDTO.overridePrice, this.servicePrice)
      this.editDTO.price = this.servicePrice;
    }

    if (!this.editDTO.appointmentId || this.editDTO.appointmentId === '') {
      this.appointmentService.createAppointmentAsync(this.editDTO).subscribe(result => {
        if (result === null) {
          this.loading = false;
          return;
        }
        if (result.errorMessage && result.errorMessage.trim() !== '') {
          this.editDTO.errorMessage = result.errorMessage;
          this.loading = false;
        } else {
          this.editAppointmentBool = false;
          this.editDTO = new AppointmentDTO();
          this.getAppointments();
        }
      });
    } else {
      this.appointmentService.updateAppointmentAsync(this.editDTO).subscribe(result => {
        if (result === null) {
          this.loading = false;
          return;
        }
        if (result.errorMessage && result.errorMessage.trim() !== '') {
          this.editDTO.errorMessage = result.errorMessage;
          this.loading = false;
        } else {
          this.editAppointmentBool = false;
          this.editDTO = new AppointmentDTO();
          this.getAppointments();
        }
      });
    }
  }

  delete(appointmentId: string) {
    this.pendingDeleteId = appointmentId;
    this.showDeleteModal = true;
  }

  onConfirmDelete(confirm: boolean) {
    if (confirm && this.pendingDeleteId) {
      this.loading = true;
      const dto = new AppointmentDTO();
      dto.appointmentId = this.pendingDeleteId;
      this.appointmentService.deleteAppointmentAsync(dto).subscribe((result) => {

        if (result === null) {
          this.loading = false;
          return;
        }

        if (result.errorMessage && result.errorMessage.trim() !== '') {
          dto.errorMessage = result.errorMessage;
          this.loading = false;
          return;
        }

        this.editAppointmentBool = false;
        this.editDTO = new AppointmentDTO();
        this.showDeleteModal = false;
        this.pendingDeleteId = null;
        this.getAppointments();
      });
    } else {
      this.showDeleteModal = false;
      this.pendingDeleteId = null;
    }
  }

  cancel() {
    this.editDTO = new AppointmentDTO();
    this.editAppointmentBool = false;
  }
}