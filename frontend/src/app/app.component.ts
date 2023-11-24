import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {
  constructor(private router: Router) {}

  ngOnInit() {
    const sessionUser = sessionStorage.getItem('loginUser');
    const localUser = localStorage.getItem('loginUser');

    if (
      !window.location.pathname.match('/register') &&
      !window.location.pathname.match('/forgotpass') &&
      !window.location.pathname.match('/setpassword') &&
      !window.location.pathname.match('/login')
    ) {
      if ((localUser && sessionUser) || sessionUser) {
        this.router.navigate([`${window.location.pathname}`]);
      } else if (localUser) {
        sessionStorage.setItem('loginUser', localUser);
        this.router.navigate([`${window.location.pathname}`]);
      } else {
        this.router.navigate(['login']);
      }
    }
  }

  ngAfterViewInit() {
    $(function () {
      $('.button-psswd').on('click', function () {
        if ($('.input-psswd').attr('psswd-shown') == 'false') {
          $('.input-psswd').removeAttr('type');
          $('.input-psswd').attr('type', 'text');

          $('.input-psswd').removeAttr('psswd-shown');
          $('.input-psswd').attr('psswd-shown', 'true');

          $('.pass-main-show').addClass('active');
        } else {
          $('.input-psswd').removeAttr('type');
          $('.input-psswd').attr('type', 'password');

          $('.input-psswd').removeAttr('psswd-shown');
          $('.input-psswd').attr('psswd-shown', 'false');

          $('.pass-main-show').removeClass('active');
        }
      });
    });
  }
}
