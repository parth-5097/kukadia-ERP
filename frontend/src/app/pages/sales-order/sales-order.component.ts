import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-sales-order',
  templateUrl: './sales-order.component.html',
  styleUrls: ['./sales-order.component.css'],
})
export class SalesOrderComponent implements OnInit {
  salesForm: FormGroup;
  submitted = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.salesForm = this.formBuilder.group({
      customer_name: ['', Validators.required],
      date: ['', Validators.required],
      address: ['', Validators.required],
      s_o_number: ['', Validators.required],
      rap: ['', Validators.required],
      ship_to: ['', Validators.required],
    });
  }

  get f() {
    return this.salesForm.controls;
  }

  onResetForm() {
    this.submitted = false;
    this.salesForm.reset();
  }

  onSubmit(val) {
    this.submitted = true;

    if (this.salesForm.invalid) {
      return;
    } else {
      this.authService
        .post('purchase-order', this.salesForm.value)
        .subscribe((res) => {
          this.toastr.success(res.message);
          val == 'new'
            ? this.salesForm.reset()
            : this.router.navigate(['/dashboard']);
        });
    }
  }
}
