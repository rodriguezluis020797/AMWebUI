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

@Component({
  selector: 'am-appointments',
  standalone: true,
  imports: [FormsModule, CommonModule, LoadingScreenComponent, DeleteEntityComponent, AppointmentStatusPipe],
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.css'
})
export class AppointmentsComponent implements OnInit {
  editDTO: AppointmentDTO = new AppointmentDTO();
  originalStatus: number = 0;
  editAppointmentBool = false;
  isNewAppointment = false;
  loading = true;
  showDeleteModal = false;
  pendingDeleteId: string | null = null;
  servicePrice = 0;
  AppointmentStatusEnum = AppointmentStatusEnum;

  appointments: (AppointmentDTO & { clientName?: string, serviceName?: string })[] = [];
  clients: ClientDTO[] = [];
  clientName: string | null = null;
  services: ServiceDTO[] = [];
  originalServicePrice = 0;

  constructor(
    private appointmentService: AppointmentService,
    private clientService: ClientService,
    private serviceService: ServiceService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.appointmentService.getAllAppointmentsAsync().pipe(
      switchMap(result => {
        if (!result) {
          this.loading = false;
          return EMPTY;
        }
        this.appointments = result;
        return this.clientService.getClientsAsync();
      }),
      switchMap(result => {
        if (!result) {
          this.loading = false;
          return EMPTY;
        }
        this.clients = result;
        return this.serviceService.getServicesAsync();
      })
    ).subscribe(result => {
      if (!result) {
        this.loading = false;
        return;
      }
      this.services = result;
      this.mapClientAndServiceNames();
    });
  }

  get selectedServiceName(): string {
    return this.services.find(s => s.serviceId === this.editDTO?.serviceId)?.name ?? '—';
  }

  onServiceChange() {
    this.loading = true;
    this.editDTO.overridePrice = false;

    const serviceDto = new ServiceDTO();
    serviceDto.serviceId = this.editDTO.serviceId;

    this.serviceService.getServicePriceAsync(serviceDto).subscribe(result => {
      if (!result) {
        this.loading = false;
        return;
      }
      this.editDTO.price = result.price;
      this.originalServicePrice = result.price;
      this.loading = false;
    });
  }

  onOverridePrice() {
    if (this.editDTO.overridePrice) {
      this.servicePrice = 0;
    } else {
      this.editDTO.price = this.services.find(s => s.serviceId === this.editDTO.serviceId)?.price ?? 0;
    }
  }

  mapClientAndServiceNames() {
    const clientMap = new Map(this.clients.map(c => [c.clientId, c]));
    const serviceMap = new Map(this.services.map(s => [s.serviceId, s]));

    this.appointments.forEach(appt => {
      const client = clientMap.get(appt.clientId);
      const service = serviceMap.get(appt.serviceId);

      appt.clientName = client
        ? `${client.firstName} ${client.middleName ?? ''} ${client.lastName}`.trim().replace(/\s+/g, ' ')
        : 'Unknown Client';
      appt.serviceName = service?.name ?? 'Unknown Service';
    });
    this.loading = false;
  }

  getAppointments() {
    this.loading = true;
    this.appointmentService.getAllAppointmentsAsync().subscribe(result => {
      this.appointments = result ?? [];
      this.loading = false;
    });
  }

  addAppointment() {
    this.loading = true;

    const now = new Date();
    const remainder = 30 - (now.getMinutes() % 30);
    now.setMinutes(now.getMinutes() + remainder, 0, 0);

    const end = new Date(now);
    end.setHours(end.getHours() + 1);

    this.editDTO = new AppointmentDTO();
    this.editDTO.startDate = this.formatDateLocal(now);
    this.editDTO.endDate = this.formatDateLocal(end);
    this.originalStatus = this.editDTO.status;

    this.editAppointmentBool = true;
    this.isNewAppointment = true;
    this.loading = false;
  }

  private formatDateLocal(date: Date): string {
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  }

  editAppointment(appointmentId: string) {
    this.loading = true;
    this.isNewAppointment = false;
    this.editAppointmentBool = true;

    const appt = this.appointments.find(x => x.appointmentId === appointmentId);
    if (!appt) {
      this.loading = false;
      return;
    }

    this.editDTO = new AppointmentDTO();
    Object.assign(this.editDTO, appt);
    this.originalStatus = appt.status;

    this.editDTO.startDate = this.formatDateLocal(new Date(appt.startDate));
    if (appt.endDate !== null) {
      this.editDTO.endDate = this.formatDateLocal(new Date(appt.endDate));
    }
    else {
      this.editDTO.endDate = null;
    }

    const client = this.clients.find(x => x.clientId === this.editDTO.clientId);
    this.clientName = client
      ? `${client.firstName} ${client.middleName ?? ''} ${client.lastName}`.trim().replace(/\s+/g, ' ')
      : 'Unknown Client';

    this.loading = false;
  }

  isEditable(): boolean {
    return this.originalStatus === 0 || this.originalStatus === 1;
  }

  save() {
    this.loading = true;
    this.editDTO.errorMessage = null;
    this.editDTO.status = Number(this.editDTO.status);

    if (this.editDTO.overridePrice) {
      this.editDTO.price = this.servicePrice;
    }

    if (!this.editDTO.setEndDate) {
      this.editDTO.endDate = null;
    }

    const obs = (!this.editDTO.appointmentId || this.editDTO.appointmentId === '')
      ? this.appointmentService.createAppointmentAsync(this.editDTO)
      : this.appointmentService.updateAppointmentAsync(this.editDTO);

    obs.subscribe(result => {
      if (!result) {
        this.loading = false;
        return;
      }
      if (result.errorMessage?.trim()) {
        this.editDTO.errorMessage = result.errorMessage;
        this.loading = false;
      } else {
        this.editAppointmentBool = false;
        this.editDTO = new AppointmentDTO();
        this.getAppointments();
      }
    });
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

      this.appointmentService.deleteAppointmentAsync(dto).subscribe(result => {
        if (!result) {
          this.loading = false;
          return;
        }
        if (result.errorMessage?.trim()) {
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