import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonRouteService } from 'src/app/service/common-route.service';

@Component({
  selector: 'app-verify-password',
  templateUrl: './verify-password.component.html',
  styleUrls: ['./verify-password.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class VerifyPasswordComponent implements OnInit {
  verifyPassForm: FormGroup;
  submitted = false;
  token: any;

  constructor(
    private toaster: ToastrService,
    private commonService: CommonRouteService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.token = params['token'];
    });

    this.verifyPassForm = this.formBuilder.group({
      new_password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f() {
    return this.verifyPassForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.verifyPassForm.invalid) {
      return;
    } else {
      this.commonService
        .post('reset-password', {
          token: this.token,
          password: this.verifyPassForm.value.new_password,
        })
        .subscribe((res) => {
          this.toaster.success(res.message);
          setTimeout(() => {
            this.router.navigate(['login']);
          }, 0);
        });
    }
  }
}
