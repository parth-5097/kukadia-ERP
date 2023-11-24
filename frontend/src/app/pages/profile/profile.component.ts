import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  data: any = {};

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.get('current-user').subscribe((res) => {
      res.data.avatar = res.data.avatar;
      this.data = res.data;
    });
  }
}
