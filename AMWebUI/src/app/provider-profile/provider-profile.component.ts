import { Component, OnInit } from '@angular/core';
import { ProviderDTO } from '../models/ProviderDTO';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProviderService } from '../services/provider.service';
import { LoadingScreenComponent } from '../partials/loading-screen/loading-screen.component';
import { RouterLink } from '@angular/router';
import { CountryCodeEnum, StateCodeEnum } from '../models/Enums';
import { ToolsService } from '../services/tools.service';

@Component({
  selector: 'am-provider-profile',
  imports: [CommonModule, RouterLink, FormsModule, LoadingScreenComponent],
  templateUrl: './provider-profile.component.html',
  styleUrl: './provider-profile.component.css',
})
export class ProviderProfileComponent implements OnInit {
  dto: ProviderDTO = new ProviderDTO();
  editDTO: ProviderDTO = new ProviderDTO();
  editProvider: boolean = false;
  loading: boolean = true;
  get countryCodeOptions(): { key: CountryCodeEnum; label: string }[] {
    return this.toolsService.getCountryCodes();
  }
  get stateCodeOptions(): { key: StateCodeEnum; label: string }[] {
    return this.toolsService.getStateCodes(this.dto.countryCode);
  }

  constructor(
    private providerService: ProviderService,
    private toolsService: ToolsService
  ) {}
  ngOnInit(): void {
    this.getProvider();
  }

  getProvider() {
    this.loading = true;
    this.providerService.getProviderAsync().subscribe((result) => {
      this.dto = result;
      this.setTimeout();
    });
  }

  edit() {
    this.editDTO = JSON.parse(JSON.stringify(this.dto));
    this.editProvider = true;
  }

  editSave() {
    this.loading = true;
    this.editDTO.countryCode = Number(this.editDTO.countryCode);
    this.editDTO.stateCode = Number(this.editDTO.stateCode);
    this.providerService
      .updateProviderAsync(this.editDTO)
      .subscribe((result) => {
        if (!result.errorMessage || result.errorMessage.trim() === '') {
          this.getProvider();
          this.cancelEdit();
        } else {
          this.editDTO.errorMessage = result.errorMessage;
        }
        this.setTimeout();
      });
  }

  cancelEdit() {
    this.editDTO = new ProviderDTO();
    this.editProvider = false;
  }
  setTimeout() {
    setTimeout(() => {
      this.loading = false;
    }, 3000);
  }
}
