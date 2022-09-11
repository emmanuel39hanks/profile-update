import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  faBars = faBars;
  faXmark = faXmark;
  nav: boolean = true;

  constructor(
    public authService: AuthService,
    private router: Router,
    private toastrMessage: ToastrService
  ) {}

  ngOnInit(): void {}
  handleNav() {
    this.nav = !this.nav;
  }

  onLogOut() {
    this.authService.logout();
    this.toastrMessage.success('You are logged out');
    this.router.navigate(['/home']);
  }
}
