import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-company-settings',
  templateUrl: './company-settings.component.html',
  styleUrls: ['./company-settings.component.css'],
})
export class CompanySettingsComponent implements OnInit {
  bankForm: FormGroup;
  subBank = false;
  readonly baseUrl = environment.PORT_URL;
  data: any = {};

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.bankForm = this.formBuilder.group({
      bank_name: ['', [Validators.required]],
      account_name: ['', [Validators.required]],
      branch_name: ['', [Validators.required]],
      account_no: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[0-9]{2}(?:[0-9]{9}|-[0-9]{3}-[0-9]{6})$/),
        ],
      ],
      ifsc_code: [
        '',
        [Validators.required, Validators.pattern(/^[A-Z]{4}0[A-Z0-9]{6}$/)],
      ],
      swift_code: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^[a-zA-Z]{4}[a-zA-Z]{2}[a-zA-Z0-9]{2}[XXX0-9]{0,3}/
          ),
        ],
      ],
      dealer_code: ['', [Validators.required]],
    });
    this.authService.get('company').subscribe((res) => {
      this.data = res.data[0];
    });
  }

  get f() {
    return this.bankForm.controls;
  }

  onSubmit() {
    this.subBank = true;

    if (this.bankForm.invalid) {
      return;
    } else {
      this.toastrService.info(this.bankForm.value);
    }
  }

  onClose() {
    this.subBank = false;
    this.bankForm.reset();
  }
}
