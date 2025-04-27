import { Component, OnInit } from '@angular/core';
import { ProviderDTO } from '../models/ProviderDTO';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProviderService } from '../services/provider.service';
import { LoadingScreenComponent } from '../partials/loading-screen/loading-screen.component';
import { RouterLink } from '@angular/router';
import { CountryCodeEnum } from '../models/Enums';

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
  countryCodes: CountryCodeEnum[] = [];

  constructor(private providerService: ProviderService) {}
  ngOnInit(): void {
    this.getProvider();
  }

  getProvider() {
    this.loading = true;
    this.providerService.getProviderAsync().subscribe((result) => {
      this.dto = result;
      this.loading = false;
    });
  }

  edit() {
    this.editDTO = JSON.parse(JSON.stringify(this.dto));
    this.countryCodes = this.providerService.getCountryCodes();
    this.editProvider = true;
  }

  editSave() {
    this.providerService
      .updateProviderAsync(this.editDTO)
      .subscribe((result) => {
        this.getProvider();
        this.cancelEdit();
      });
  }

  cancelEdit() {
    this.editDTO = new ProviderDTO();
    this.editProvider = false;
  }
}
