import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AlertMessagesService } from 'jjwins-angular-alert-messages';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(
    public authService: AuthService,
    private alertMessage: AlertMessagesService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onLogOut() {
    this.authService.logout();
    this.alertMessage.show('You are logged out', {
      cssClass: 'alert-success',
      timeOut: 3000,
    });
    this.router.navigate(['/home']);
  }
}
