import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebSocketService } from 'src/app/service/web-socket.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
})
export class LogoutComponent implements OnInit {
  constructor(
    private router: Router,
    private socketService: WebSocketService
  ) {}

  ngOnInit(): void {
    localStorage.clear();
    sessionStorage.clear();
    this.socketService.close();

    setTimeout(() => {
      this.router.navigate(['login']);
    }, 2000);
  }
}
