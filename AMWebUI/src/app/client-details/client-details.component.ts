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
import { ToolsService } from '../_services/tools.service';

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
  addClientNote = false;

  clientEditDto: ClientDTO = new ClientDTO();
  editClient = false;

  loading = false;
  showDeleteModal = false;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private tools: ToolsService
  ) { }

  ngOnInit(): void {
    this.getClientNotes();
  }

  getClientNotes(): void {
    this.loading = true;
    this.clientService.getClientNotesAsync(this.clientDto).subscribe({
      next: (result) => {
        this.clientNotes = result ?? [];
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.clientNotes = [];
      }
    });
  }

  editClientFunc(): void {
    this.editClient = true;
    this.clientEditDto = JSON.parse(JSON.stringify(this.clientDto));
  }

  cancelEditClient(): void {
    this.clientEditDto = new ClientDTO();
    this.editClient = false;
  }

  saveClient(): void {
    this.loading = true;
    this.clientDto.errorMessage = null;
    this.clientService.updateClientAsync(this.clientEditDto).subscribe({
      next: (result) => {
        if (result && result.errorMessage?.trim()) {
          this.clientDto.errorMessage = result.errorMessage;
        } else if (result) {
          // Update original clientDto with edits if successful
          this.clientDto = { ...this.clientEditDto };
          this.editClient = false;
        }
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  deleteClient(): void {
    this.showDeleteModal = true;
  }

  onConfirmDelete(confirm: boolean): void {
    if (!confirm) {
      this.showDeleteModal = false;
      return;
    }
    this.loading = true;
    this.clientService.deleteClientAsync(this.clientDto).subscribe({
      next: (result) => {
        this.clientDto.errorMessage = result?.errorMessage ?? null;
        if (!this.clientDto.errorMessage?.trim()) {
          this.showDeleteModal = false;
          this.router.navigate(['/clients']);
        } else {
          this.showDeleteModal = false;
        }
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.showDeleteModal = false;
      }
    });
  }

  addNote(): void {
    this.clientNoteToAdd = new ClientNoteDTO();
    this.addClientNote = true;
  }

  saveNote(): void {
    this.loading = true;
    this.clientNoteToAdd.clientId = this.clientDto.clientId;
    this.clientService.createClientNoteAsync(this.clientNoteToAdd).subscribe({
      next: (result) => {
        if (result) {
          this.getClientNotes();
        }
        this.addClientNote = false;
        this.loading = false;
      },
      error: () => {
        this.addClientNote = false;
        this.loading = false;
      }
    });
  }

  cancelNote(): void {
    this.addClientNote = false;
  }

  editNote(note: ClientNoteDTO): void {
    this.selectedClientNote = JSON.parse(JSON.stringify(note));
  }

  goBackToClientList(): void {
    this.back.emit();
  }

  goBackToClient(): void {
    this.selectedClientNote = null;
    this.getClientNotes();
  }

  trackByNoteId(index: number, note: ClientNoteDTO): string | number {
    return note.clientNoteId ?? index;
  }
}