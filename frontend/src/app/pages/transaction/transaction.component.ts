import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';

declare var $: any;

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css'],
})
export class TransactionComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false })
  datatableElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  data: any[] = [];
  ending_balance: any = 0;

  constructor(
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'simple_numbers',
      pageLength: 10,
      paging: true,
      destroy: true,
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
      this.ending_balance = this.data.reduce((sum, key) => {
        return sum + key.balance;
      }, 0);
    });
  }

  getDbData() {
    return new Promise((resolve, reject) => {
      this.data = [];
      this.authService.get('transaction').subscribe((res) => {
        this.data = res.data;
        resolve(res);
      });
    });
  }

  ngAfterViewInit(): void {
    $(document).ready(function () {
      $('#transaction-list_wrapper .dataTables_scrollBody').height(
        $(window).height() - 520
      );
    });
  }

  onEditRaw(id) {
    let new_data = this.data.filter((e) => e.id === id)[0];
    this.authService
      .put(`transaction/${id}`, {
        payee: new_data.payee,
        account: new_data.account,
        memo: new_data.memo,
        deposite: new_data.deposite,
        payment: new_data.payment,
        balance: new_data.balance,
      })
      .subscribe((res) => {
        this.toastr.success(res.message);
        this.getDbData().then((data) => {
          this.ending_balance = this.data.reduce((sum, key) => {
            return sum + key.balance;
          }, 0);
          this.dtTrigger.next();
        });
      });
  }

  onDeleteRaw(id) {
    this.authService.delete(`transaction/${id}`).subscribe((res) => {
      this.toastr.success(res.message);
      this.getDbData().then((data) => {
        this.ending_balance = this.data.reduce((sum, key) => {
          return sum + key.balance;
        }, 0);
        this.dtTrigger.next();
      });
    });
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

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
