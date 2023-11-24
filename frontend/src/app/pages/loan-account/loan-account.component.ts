import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  Form,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { CommonRouteService } from 'src/app/service/common-route.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-loan-account',
  templateUrl: './loan-account.component.html',
  styleUrls: ['./loan-account.component.css'],
})
export class LoanAccountComponent implements OnInit, OnDestroy {
  loanForm: FormGroup;
  borrowers: FormArray;
  gaurenters: FormArray;
  property_detail: FormArray;
  submitted = false;

  @ViewChild(DataTableDirective, { static: false })
  datatableElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  data: any[] = [];
  selectedData: any[] = [];
  accDetail: any = {};

  constructor(
    private authService: AuthService,
    private commonService: CommonRouteService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'simple_numbers',
      pageLength: 25,
      paging: true,
      processing: true,
      ordering: false,
      destroy: true,
      scrollX: true,
      scrollY: '50vh',
      language: {
        paginate: {
          next: '<i class="fa fa-angle-double-right"></i>',
          previous: '<i class="fa fa-angle-double-left"></i>',
          first: '<i class="fa fa-angle-double-right"></i>',
          last: '<i class="fa fa-angle-double-left"></i>',
        },
      },
    };

    this.loanForm = this.formBuilder.group({
      start_balance: ['', Validators.required],
      end_balance: ['', Validators.required],
      payment_amount: ['', Validators.required],
      loan_code: ['', Validators.required],
      bank: ['', Validators.required],
      borrowers: this.formBuilder.array([this.createBorrowers()]),
      gaurenters: this.formBuilder.array([this.createGaurenters()]),
      property_detail: this.formBuilder.array([this.createPropertyDetails()]),
      principal: ['', Validators.required],
      interest: ['', Validators.required],
      tenure: ['', Validators.required],
      emi_amount: ['', Validators.required],
      processing_changes: ['', Validators.required],
    });

    this.getDbData().then((data) => {
      this.dtTrigger.next();
    });
  }

  get f() {
    return this.loanForm.controls;
  }

  getDbData() {
    return new Promise((resolve, reject) => {
      this.data = [];
      this.authService.get(`loan-account`).subscribe((res) => {
        this.data = res.data;
        resolve(res);
      });
    });
  }

  createBorrowers(): FormGroup {
    return this.formBuilder.group({
      borrowers: '',
    });
  }

  createGaurenters(): FormGroup {
    return this.formBuilder.group({
      gaurenters: '',
    });
  }

  createPropertyDetails(): FormGroup {
    return this.formBuilder.group({
      property_detail: '',
    });
  }

  plusBorrowers() {
    this.borrowers = this.loanForm.get('borrowers') as FormArray;
    this.borrowers.push(this.createBorrowers());
  }

  plusGaurenters() {
    this.gaurenters = this.loanForm.get('gaurenters') as FormArray;
    this.gaurenters.push(this.createGaurenters());
  }

  plusPropertyDetails() {
    this.property_detail = this.loanForm.get('property_details') as FormArray;
    this.property_detail.push(this.createPropertyDetails());
  }

  reload() {
    this.getDbData().then((res) => {
      this.dtTrigger.next();
    });
  }

  rerender() {
    this.dtTrigger.next();
  }

  onAccClick(id) {
    this.accDetail = this.data.find((el) => (el.id = id));
  }

  onExport(val) {
    var jsonData = this.selectedData.length > 0 ? this.selectedData : this.data;
    this.commonService
      .post(`${val == 'pdf' ? 'make-pdf/loan-account' : 'make-csv'}`, {
        data: jsonData,
      })
      .subscribe((res) => {
        window.open(`${environment.PORT_URL}/${res.data}`, '__blank');
      });
  }

  onSubmit() {
    this.submitted = true;

    if (this.loanForm.invalid) {
      return;
    } else {
      this.authService
        .post('loan-account', this.loanForm.value)
        .subscribe((res) => {
          this.toastr.success(res.message);
          this.loanForm.reset();
        });
    }
  }

  onCancel() {
    this.loanForm.reset();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
