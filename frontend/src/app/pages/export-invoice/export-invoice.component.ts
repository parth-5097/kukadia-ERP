import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-export-invoice',
  templateUrl: './export-invoice.component.html',
  styleUrls: ['./export-invoice.component.css'],
})
export class ExportInvoiceComponent implements OnInit {
  exportForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.exportForm = this.formBuilder.group({
      vendor_name: ['', Validators.required],
      date: ['', Validators.required],
      invoice_id: ['', Validators.required],
      p_o_number: ['', Validators.required],
      terms: ['', Validators.required],
      ship: ['', Validators.required],
      bill_to: ['', Validators.required],
      ship_to: ['', Validators.required],
      via: ['', Validators.required],
      f_o_b: ['', Validators.required],
      rap: ['', Validators.required],
      broker: ['', Validators.required],
      brokerage: ['', Validators.required],
      pre_carriage_by: ['', Validators.required],
      flight_no: ['', Validators.required],
      final_dest: ['', Validators.required],
      port_of_loading: ['', Validators.required],
      country_of_goods: ['', Validators.required],
    });
  }

  get f() {
    return this.exportForm.controls;
  }

  onSubmit(val) {
    this.submitted = true;

    if (this.exportForm.invalid) {
      return;
    } else {
      this.authService
        .post('invoice', this.exportForm.value)
        .subscribe((res) => {
          this.toastr.success(res.message);
          val == 'new'
            ? this.exportForm.reset()
            : this.router.navigate(['/dashboard']);
        });
    }
  }

  onResetForm() {
    this.submitted = false;
    this.exportForm.reset();
  }
}
