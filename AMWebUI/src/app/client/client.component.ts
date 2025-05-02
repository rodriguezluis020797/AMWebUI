import { Component, OnInit } from '@angular/core';
import { ClientService } from '../_services/client.service';
import { ClientDTO } from '../models/ClientDTO';
import { CommonModule } from '@angular/common';
import { LoadingScreenComponent } from "../partials/loading-screen/loading-screen.component";
import { FormsModule } from '@angular/forms';
import { DeleteEntityComponent } from "../partials/delete-entity/delete-entity.component";

@Component({
  selector: 'am-clients',
  imports: [FormsModule, CommonModule, LoadingScreenComponent, DeleteEntityComponent],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent implements OnInit {

  clients: ClientDTO[] = [];
  editDTO: ClientDTO = new ClientDTO();
  editClientBool: boolean = false;
  isNewClient: boolean = false;
  loading: boolean = true;
  showDeleteModal: boolean = false;
  pendingDeleteId: string | null = null;

  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    this.getClients();
  }

  getClients() {
    this.loading = true;
    this.clientService.getClientsAsync().subscribe((result) => {
      this.clients = result;
      this.setTimeout();
    });
  }

  addClient() {
    this.loading = true;
    this.editClientBool = true;
    this.isNewClient = true;
    this.setTimeout();
  }

  editClient(clientId: string) {
    this.loading = true;
    this.isNewClient = false;
    this.editClientBool = true;
    this.editDTO = JSON.parse(JSON.stringify(this.clients.find(x => x.clientId === clientId)));
    this.setTimeout();
  }

  save() {
    this.loading = true;
    this.editDTO.errorMessage = null;

    if (!this.editDTO.clientId || this.editDTO.clientId === '') {
      this.clientService.createClientAsync(this.editDTO).subscribe((result) => {
        if (result.errorMessage && result.errorMessage.trim() !== '') {
          this.editDTO.errorMessage = result.errorMessage;
        } else {
          this.editClientBool = false;
          this.editDTO = new ClientDTO();
          this.getClients();
        }
        this.setTimeout();
      });
    } else {
      this.clientService.updateClientAsync(this.editDTO).subscribe((result) => {
        if (result.errorMessage && result.errorMessage.trim() !== '') {
          this.editDTO.errorMessage = result.errorMessage;
        } else {
          this.editClientBool = false;
          this.editDTO = new ClientDTO();
          this.getClients();
        }
        this.setTimeout();
      });
    }
  }

  delete(clientId: string) {
    this.pendingDeleteId = clientId;
    this.showDeleteModal = true;
  }

  onConfirmDelete(confirm: boolean) {
    if (confirm && this.pendingDeleteId) {
      this.loading = true;
      const dto = new ClientDTO();
      dto.clientId = this.pendingDeleteId;
      this.clientService.deleteClientAsync(dto).subscribe(() => {
        this.editClientBool = false;
        this.editDTO = new ClientDTO();
        this.showDeleteModal = false;
        this.pendingDeleteId = null;
        this.getClients();
      });
    } else {
      this.showDeleteModal = false;
      this.pendingDeleteId = null;
    }
  }

  cancel() {
    this.editDTO = new ClientDTO();
    this.editClientBool = false;
  }

  setTimeout() {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }
}