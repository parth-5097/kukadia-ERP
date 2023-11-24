import {
  AfterContentInit,
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { CommonRouteService } from 'src/app/service/common-route.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-funds-transfer',
  templateUrl: './funds-transfer.component.html',
  styleUrls: ['./funds-transfer.component.css'],
})
export class FundsTransferComponent
  implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false })
  datatableElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  data: any[] = [];
  selectedData: any[] = [];

  fundTransaferForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private commonService: CommonRouteService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fundTransaferForm = this.formBuilder.group({
      class: ['', Validators.required],
      t_f_from: ['', Validators.required],
      t_f_to: ['', Validators.required],
      date: ['', [Validators.required]],
      t_currency: ['', Validators.required],
      t_amount: ['', Validators.required],
    });

    this.dtOptions = {
      pagingType: 'simple_numbers',
      pageLength: 10,
      destroy: true,
      paging: true,
      processing: true,
      scrollX: true,
      language: {
        paginate: {
          next: '<i class="fa fa-angle-double-right"></i>',
          previous: '<i class="fa fa-angle-double-left  "></i>',
          first: '<i class="fa fa-angle-double-right"></i>',
          last: '<i class="fa fa-angle-double-left"></i>',
        },
      },
    };

    this.getDbData().then((res) => {
      this.dtTrigger.next();
    });
  }

  getDbData() {
    return new Promise((resolve, reject) => {
      this.authService.get('fund-transfer').subscribe((res) => {
        this.data = res.data;
        resolve('');
      });
    });
  }

  get f() {
    return this.fundTransaferForm.controls;
  }

  onSubmit(val) {
    this.submitted = true;

    if (this.fundTransaferForm.invalid) {
      return;
    } else {
      this.authService
        .post('fund-transfer', this.fundTransaferForm.value)
        .subscribe((res) => {
          this.toastr.success(res.message);
          val == 'new'
            ? this.fundTransaferForm.reset()
            : this.router.navigate(['/dashboard']);
        });
    }
  }

  onExport(val) {
    var jsonData = this.data;
    this.commonService
      .post(`${val == 'pdf' ? 'make-pdf' : 'make-csv'}`, {
        data: jsonData,
      })
      .subscribe((res) => {
        window.open(`${environment.PORT_URL}/${res.data}`, '__blank');
      });
  }

  onResetForm() {
    this.submitted = false;
    this.fundTransaferForm.reset();
  }

  ReloadDatatable() {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      this.getDbData().then((res) => {
        this.dtTrigger.next();
      });
    });
  }

  rerender(): void {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      this.dtTrigger.next();
    });
  }

  onEditRaw(id) {
    let new_data = this.data.filter((e) => e.id === id)[0];
    this.authService
      .put(`fund-transfer/${id}`, {
        class: new_data.class,
        t_f_from: new_data.t_f_from,
        t_f_to: new_data.t_f_to,
        date: new_data.date,
        t_currency: new_data.t_currency,
        t_amount: new_data.t_amount,
      })
      .subscribe((res) => {
        this.toastr.success(res.message);
        this.getDbData().then((data) => {
          this.dtTrigger.next();
        });
      });
  }

  onDeleteRaw(id) {
    this.authService.delete(`fund-transfer/${id}`).subscribe((res) => {
      this.toastr.success(res.message);
      this.getDbData().then((data) => {
        this.dtTrigger.next();
      });
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  onCheck(data, event) {
    if (event.target.checked) {
      this.selectedData.push(this.data.filter((e) => e.id == data.id)[0]);
    } else {
      this.selectedData = this.selectedData.filter((e) => e.id !== data.id);
    }
  }

  ngAfterViewInit(): void {
    var clicked = false;
    let that = this;
    $('.cust-chkmark').on('click', function () {
      $('.checkhour').prop('checked', !clicked);
      that.selectedData = !clicked ? that.data : [];
      clicked = !clicked;
    });
  }
}
