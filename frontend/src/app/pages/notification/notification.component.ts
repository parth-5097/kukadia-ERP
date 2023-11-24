import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent implements OnInit {
  data: any[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.get('/notification').subscribe((res) => {
      this.data = res.data;
    });
  }

  onClose(val) {
    this.data = this.data.filter((el) => el.id !== val);
  }
}
