import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-intra-state-bill',
  templateUrl: './intra-state-bill.component.html',
  styleUrls: ['./intra-state-bill.component.css'],
})
export class IntraStateBillComponent implements OnInit {
  intraForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.intraForm = this.formBuilder.group({
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
    });
  }

  get f() {
    return this.intraForm.controls;
  }

  onSubmit(val) {
    this.submitted = true;

    if (this.intraForm.invalid) {
      return;
    } else {
      this.authService.post('bill', this.intraForm.value).subscribe((res) => {
        this.toastr.success(res.message);
        val == 'new'
          ? this.intraForm.reset()
          : this.router.navigate(['/dashboard']);
      });
    }
  }

  onResetForm() {
    this.submitted = false;
    this.intraForm.reset();
  }
}
