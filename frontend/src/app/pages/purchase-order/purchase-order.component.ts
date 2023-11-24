import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-purchase-order',
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.css'],
})
export class PurchaseOrderComponent implements OnInit {
  purchaseForm: FormGroup;
  submitted = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.purchaseForm = this.formBuilder.group({
      vendor_name: ['', Validators.required],
      date: ['', Validators.required],
      vendor: ['', Validators.required],
      p_o_number: ['', Validators.required],
      ship_to: ['', Validators.required],
    });
  }

  get f() {
    return this.purchaseForm.controls;
  }

  onResetForm() {
    this.submitted = false;
    this.purchaseForm.reset();
  }

  onSubmit(val) {
    this.submitted = true;

    if (this.purchaseForm.invalid) {
      return;
    } else {
      this.authService
        .post('purchase-order', this.purchaseForm.value)
        .subscribe((res) => {
          this.toastr.success(res.message);
          val == 'new'
            ? this.purchaseForm.reset()
            : this.router.navigate(['/dashboard']);
        });
    }
  }
}
