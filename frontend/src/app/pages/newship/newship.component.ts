import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-newship',
  templateUrl: './newship.component.html',
  styleUrls: ['./newship.component.css'],
})
export class NewshipComponent implements OnInit {
  shipForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.shipForm = this.formBuilder.group({
      invoice_type: ['', Validators.required],
      invoice_id: ['', Validators.required],
      sub_total: ['', Validators.required],
      tax_rate: ['', Validators.required],
      total: ['', Validators.required],
      shipping_partner: ['', Validators.required],
      tracking_number: ['', Validators.required],
      shipping_address: ['', Validators.required],
      date: ['', Validators.required],
      approx_delivery_date: ['', Validators.required],
    });
  }

  get f() {
    return this.shipForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.shipForm.invalid) {
      return;
    } else {
      this.authService
        .post('inventory', this.shipForm.value)
        .subscribe((res) => {
          this.submitted = false;
          this.shipForm.reset();
          this.toastr.success(res.message);
        });
    }
  }

  onCancel() {
    this.router.navigate(['/ship']);
  }
}
