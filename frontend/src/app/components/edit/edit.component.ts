import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  user!: any;
  id!: string;
  firstName!: string;
  lastName!: string;
  email!: string;
  username!: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastMessage: ToastrService
  ) {}

  ngOnInit(): void {
    const userData = JSON.parse(`${localStorage.getItem('user')}`);
    if (userData) {
      this.id = userData.id;
      this.user = userData;
    }
  }

  onEditSubmit() {
    const data = {
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
      username: this.user.username,
    };
    localStorage.removeItem('user');
    localStorage.setItem('user', JSON.stringify(this.user));
    this.authService.updateProfile(this.id, data).subscribe((data) => {
      this.toastMessage.success('You have updated your details successfully!');
      this.router.navigate(['/dashboard']);
    });
  }
}
