import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonRouteService } from 'src/app/service/common-route.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ForgotPasswordComponent implements OnInit {
  forgotpassForm: FormGroup;
  submitted = false;

  constructor(
    private toastr: ToastrService,
    private commonService: CommonRouteService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.forgotpassForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/),
        ],
      ],
    });
  }

  get f() {
    return this.forgotpassForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.forgotpassForm.invalid) {
      return;
    } else {
      this.commonService
        .post('forgot-pass', this.forgotpassForm.value)
        .subscribe((res) => {
          this.toastr.success(res.message);
          setTimeout(() => {
            this.router.navigate(['login']);
          }, 0);
        });
    }
  }
}
