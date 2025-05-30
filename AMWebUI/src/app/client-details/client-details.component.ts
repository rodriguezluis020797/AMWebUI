import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ClientDTO } from '../models/ClientDTO';
import { ClientService } from '../_services/client.service';
import { ClientNoteDTO } from '../models/ClientNoteDTO';
import { CommonModule } from '@angular/common';
import { LoadingScreenComponent } from '../partials/loading-screen/loading-screen.component';
import { FormsModule } from '@angular/forms';
import { DeleteEntityComponent } from '../partials/delete-entity/delete-entity.component';
import { Router } from '@angular/router';
import { ClientNoteDetailsComponent } from "../client-note-details/client-notes-details.component";

@Component({
  selector: 'am-client-details',
  imports: [CommonModule, LoadingScreenComponent, FormsModule, DeleteEntityComponent, ClientNoteDetailsComponent],
  templateUrl: './client-details.component.html',
  styleUrl: './client-details.component.css'
})

export class ClientDetailsComponent implements OnInit {
  @Input() clientDto: ClientDTO = new ClientDTO();
  @Output() back = new EventEmitter<void>();


  clientNotes: ClientNoteDTO[] = [];
  selectedClientNote: ClientNoteDTO | null = null;
  clientNoteToAdd: ClientNoteDTO = new ClientNoteDTO();
  addClientNote: boolean = false;

  clientEditDto: ClientDTO = new ClientDTO();
  editClient: boolean = false;

  loading: boolean = false;
  showDeleteModal: boolean = false;

  constructor(private clientService: ClientService, private router: Router) { }
  ngOnInit(): void {
    this.getClientNotes();
  }

  getClientNotes() {
    this.loading = true;
    this.clientService
      .getClientNotesAsync(this.clientDto)
      .subscribe((result) => {
        if (result === null) {
          this.loading = false
          return;
        }
        this.clientNotes = result;

        console.log(this.clientNotes)
        this.loading = false;
      });
  }

  editClientFunc() {
    this.loading = true;
    this.editClient = true;
    this.clientEditDto = JSON.parse(JSON.stringify(this.clientDto));

    this.loading = false;
  }

  cancelEditClient() {
    this.loading = true;
    this.clientEditDto = new ClientDTO();
    this.editClient = false;
    this.loading = false;
  }

  saveClient() {
    this.loading = true;
    this.clientDto.errorMessage = null;
    this.clientService.updateClientAsync(this.clientDto).subscribe((result) => {
      if (result === null) {
        this.loading = false;
        return;
      }
      if (result.errorMessage && result.errorMessage.trim() !== '') {
        this.clientDto.errorMessage = result.errorMessage;
      } else {
        this.editClient = false;
      }
      this.loading = false;
    });
  }

  deleteClient() {
    this.loading = true;
    this.showDeleteModal = true;
    this.loading = false;
  }

  onConfirmDelete(confirm: boolean) {
    if (confirm) {
      this.loading = true;
      this.clientService.deleteClientAsync(this.clientDto).subscribe(() => {
        this.showDeleteModal = false;
        this.router.navigate(['/clients'])
        this.loading = false;
      });
    } else {
      this.showDeleteModal = false;
      this.loading = false;
    }
  }

  addNote() {
    this.loading = true;
    this.clientNoteToAdd = new ClientNoteDTO();
    this.addClientNote = true;
    this.loading = false;
  }

  saveNote() {
    this.loading = true;
    this.clientNoteToAdd.clientId = this.clientDto.clientId;
    this.clientService
      .createClientNoteAsync(this.clientNoteToAdd)
      .subscribe((result) => {
        if (result === null) {
          this.addClientNote = false;
          this.loading = false;
          return;
        }
        this.getClientNotes();
        this.addClientNote = false;
        this.loading = false;
      });
  }

  cancelNote() {
    this.loading = true;
    this.addClientNote = false;
    this.loading = false;
  }

  editNote(note: ClientNoteDTO) {
    this.loading = true;
    console.log(note);
    this.selectedClientNote = JSON.parse(JSON.stringify(note));
    this.loading = false;
  }

  goBackToClientList() {
    this.back.emit();
  }

  goBackToClient() {
    this.selectedClientNote = null;
  }
}
