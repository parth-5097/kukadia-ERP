import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonRouteService } from 'src/app/service/common-route.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  keepMe: any;
  submitted = false;

  constructor(
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private commonService: CommonRouteService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    } else {
      this.loginForm.value.acc_type = 1;
      this.loginForm.value.device_type = 'desktop';
      this.commonService
        .post('login', this.loginForm.value)
        .subscribe(async (res) => {
          this.toastr.success('Logged in');
          sessionStorage.setItem('loginUser', JSON.stringify(res.data));
          this.keepMe == true
            ? localStorage.setItem('loginUser', JSON.stringify(res.data))
            : '';
          setTimeout(() => {
            window.location.href = 'dashboard';
          }, 200);
        });
    }
  }
}
