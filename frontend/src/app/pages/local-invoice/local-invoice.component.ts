import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-local-invoice',
  templateUrl: './local-invoice.component.html',
  styleUrls: ['./local-invoice.component.css'],
})
export class LocalInvoiceComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false })
  datatableElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  data: any[] = [];
  curDate: any = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
  localForm: FormGroup;
  subTotal: any = 0;
  balanceDue: any = 0;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.curDate = this.curDate.split('/').reverse().join('/');
    this.localForm = this.formBuilder.group({
      vendor_name: ['', Validators.required],
      date: ['', Validators.required],
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

    this.dtOptions = {
      pagingType: 'simple_numbers',
      pageLength: 10,
      paging: true,
      processing: true,
      ordering: false,
      destroy: true,
      scrollX: true,
      language: {
        paginate: {
          next: '<i class="fa fa-angle-double-right"></i>',
          previous: '<i class="fa fa-angle-double-left"></i>',
          first: '<i class="fa fa-angle-double-right"></i>',
          last: '<i class="fa fa-angle-double-left"></i>',
        },
      },
    };

    this.getDbData().then((data) => {
      this.dtTrigger.next();
    });
  }

  getDbData() {
    return new Promise((resolve, reject) => {
      this.data = [];
      this.authService.get('local-invoice').subscribe((res) => {
        this.data = res.data;
        resolve(res);
      });
    });
  }

  get f() {
    return this.localForm.controls;
  }

  onSubmit(val) {
    this.submitted = true;

    if (this.localForm.invalid) {
      return;
    } else {
      this.authService
        .post('invoice', this.localForm.value)
        .subscribe((res) => {
          this.toastr.success(res.message);
          val == 'new'
            ? this.localForm.reset()
            : this.router.navigate(['/dashboard']);
        });
    }
  }

  onResetForm() {
    this.submitted = false;
    this.localForm.reset();
  }
}
