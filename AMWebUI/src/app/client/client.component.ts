import { Component, OnInit } from '@angular/core';
import { ClientService } from '../_services/client.service';
import { ClientDTO } from '../models/ClientDTO';
import { CommonModule } from '@angular/common';
import { LoadingScreenComponent } from "../partials/loading-screen/loading-screen.component";
import { FormsModule } from '@angular/forms';
import { DeleteEntityComponent } from "../partials/delete-entity/delete-entity.component";
import { ClientDetailsComponent } from '../client-details/client-details.component';

@Component({
  selector: 'am-clients',
  imports: [FormsModule, CommonModule, LoadingScreenComponent, ClientDetailsComponent],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent implements OnInit {

  clients: ClientDTO[] = [];
  editDTO: ClientDTO = new ClientDTO();
  add: boolean = false;
  loading: boolean = true;
  selectedClient: ClientDTO | null = null;

  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    this.getClients();
  }

  getClients() {
    this.loading = true;
    this.clientService.getClientsAsync().subscribe((result) => {
      if (result === null) {
        this.loading = false;
        return;
      }
      this.clients = result;
      this.loading = false;
    });
  }

  addClient() {
    this.loading = true;
    this.add = true;
    this.loading = false;
  }

  save() {
    this.loading = true;
    this.editDTO.errorMessage = null;
    this.clientService.createClientAsync(this.editDTO).subscribe((result) => {
      if (result === null) {
        this.loading = false;
        return;
      }
      if (result.errorMessage && result.errorMessage.trim() !== '') {
        this.editDTO.errorMessage = result.errorMessage;
      } else {
        this.add = false;
        this.editDTO = new ClientDTO();
        this.getClients();
      }
      this.loading = false;
    });
  }

  cancel() {
    this.editDTO = new ClientDTO();
    this.add = false;
  }

  selectClient(client: ClientDTO) {
    this.selectedClient = client;
  }

  goBackToList() {
    this.selectedClient = null;
  }
}