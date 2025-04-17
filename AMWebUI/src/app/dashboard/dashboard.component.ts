import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDTO } from '../models/UserDTO';
import { UserService } from '../services/user.service';
import { LoadingScreenComponent } from '../partials/loading-screen/loading-screen.component';

@Component({
  selector: 'am-dashboard',
  imports: [CommonModule, LoadingScreenComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  constructor(private userService: UserService) {}
  user: UserDTO = new UserDTO();
  loadingUser = true;

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.userService.getUserAsync().subscribe((result) => {
      this.user = result;
      this.loadingUser = false;
    });
  }
}
