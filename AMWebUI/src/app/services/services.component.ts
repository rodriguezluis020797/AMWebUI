import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../_services/service.service';
import { ServiceDTO } from '../models/ServiceDTO';
import { CommonModule } from '@angular/common';
import { LoadingScreenComponent } from "../partials/loading-screen/loading-screen.component";
import { FormsModule } from '@angular/forms';
import { DeleteEntityComponent } from "../partials/delete-entity/delete-entity.component";
import { ToolsService } from '../_services/tools.service';

@Component({
  selector: 'am-services',
  standalone: true,
  imports: [FormsModule, CommonModule, LoadingScreenComponent, DeleteEntityComponent],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent implements OnInit {
  services: ServiceDTO[] = [];
  editDTO: ServiceDTO = new ServiceDTO();
  editServiceBool = false;
  isNewService = false;
  loading = true;
  showDeleteModal = false;
  pendingDeleteId: string | null = null;

  constructor(private serviceService: ServiceService, private tools: ToolsService) { }

  ngOnInit(): void {
    this.getServices();
  }

  getServices(): void {
    this.loading = true;
    this.serviceService.getServicesAsync().subscribe(result => {
      this.services = result ?? [];
      this.loading = false;
    });
  }

  addService(): void {
    this.editDTO = new ServiceDTO();
    this.editServiceBool = true;
    this.isNewService = true;
  }

  editService(serviceId: string): void {
    const svc = this.services.find(x => x.serviceId === serviceId);
    this.editDTO = svc ? { ...svc } : new ServiceDTO();
    this.editServiceBool = true;
    this.isNewService = false;
  }

  save(): void {
    this.loading = true;
    this.editDTO.errorMessage = null;

    const operation = !this.editDTO.serviceId
      ? this.serviceService.createServiceAsync(this.editDTO)
      : this.serviceService.updateServiceAsync(this.editDTO);

    operation.subscribe(result => {
      this.loading = false;
      if (!result) return;

      if (result.errorMessage?.trim()) {
        this.editDTO.errorMessage = result.errorMessage;
        return;
      }

      this.editServiceBool = false;
      this.editDTO = new ServiceDTO();
      this.getServices();
    });
  }

  delete(serviceId: string): void {
    this.pendingDeleteId = serviceId;
    this.showDeleteModal = true;
  }

  onConfirmDelete(confirm: boolean): void {
    if (confirm && this.pendingDeleteId) {
      this.loading = true;
      const dto = new ServiceDTO();
      dto.serviceId = this.pendingDeleteId;

      this.serviceService.deleteServiceAsync(dto).subscribe(result => {
        this.loading = false;
        if (!result) return;

        this.editDTO.errorMessage = result.errorMessage;

        if (!result.errorMessage?.trim()) {
          this.resetState();
          this.getServices();
        }

        this.showDeleteModal = false;
        this.pendingDeleteId = null;
      });
    } else {
      this.loading = false;
      this.showDeleteModal = false;
      this.pendingDeleteId = null;
    }
  }

  cancel(): void {
    this.editDTO = new ServiceDTO();
    this.editServiceBool = false;
  }

  trackByServiceId(index: number, svc: ServiceDTO): string {
    return svc.serviceId;
  }

  private resetState(): void {
    this.editDTO = new ServiceDTO();
    this.editServiceBool = false;
  }
}