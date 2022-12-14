import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  user!: User;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getProfile().subscribe(({ user }) => {
      this.user = user;
    });
  }
}
