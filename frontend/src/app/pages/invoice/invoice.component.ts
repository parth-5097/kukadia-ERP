import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { WebSocketService } from 'src/app/service/web-socket.service';
import { environment } from 'src/environments/environment';

declare var $: any;

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
})
export class InvoiceComponent implements OnInit, AfterViewInit {
  @Input() set globalBranch(branch: any) {
    if (branch == undefined) {
      this.authService.get(`invoice`).subscribe((res) => {
        this.data = res.data;
      });
      environment.branch = {};
    } else {
      this.company = branch;
      environment.branch = branch;
      this.authService.get(`invoice?branch=${branch.id}`).subscribe((res) => {
        this.data = res.data;
      });
      this.authService.get(`latest-invoice/${branch.id}`).subscribe((res) => {
        this.invoice_id = res.data[0].invoice_id - -1;
      });
    }
  }

  @ViewChild(DataTableDirective, { static: false })
  datatableElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  data: any[] = [];
  selectedData: any[] = [];
  invoice: any = {};
  invoice_id: any;
  company: any;
  calc: any = {
    unpaid: 0,
    overdue: 0,
    notdue: 0,
    paid: 0,
    notdeposited: 0,
    deposited: 0,
  };
  selectedInvoice: any;

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private websocketService: WebSocketService
  ) {
    this.websocketService
      .listen('UPDATED_INVOICE_NUMBER')
      .subscribe((res: any) => {
        this.invoice_id = res.invoice_id - -1;
      });
  }

  ngOnInit(): void {
    this.company = environment.branch;

    this.company.id
      ? this.authService
          .get(`latest-invoice/${this.company.id}`)
          .subscribe((res) => {
            this.invoice_id = res.data[0].invoice_id - -1;
          })
      : ``;

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

    this.getDbData().then((data) => {
      this.dtTrigger.next();
      this.calculateValues();
    });
  }

  getDbData() {
    return new Promise((resolve, reject) => {
      this.data = [];
      let filter = this.company.id ? `?branch=${this.company.id}` : ``;
      this.authService.get(`invoice${filter}`).subscribe((res) => {
        this.data = res.data;
        resolve(res);
      });
    });
  }

  reload() {
    this.getDbData().then((res) => {
      this.dtTrigger.next();
      this.setZeroOnValue();
      this.calculateValues();
    });
  }

  filterData(status, date) {
    this.setZeroOnValue();
    var d = new Date();
    this.data = [];
    let value = date
      ? `?start_date=${this.getBeforeDate(date)}&end_date=${
          d.toISOString().split('T')[0]
        }&status=${status}`
      : `?status=${status}`;
    this.authService.get(`invoice${value}`).subscribe((res) => {
      this.data = res.data;
      this.dtTrigger.next();
      this.calculateValues();
    });
  }

  onDuplicateRecordAdd(invoice) {
    this.authService
      .post(`invoice`, {
        amount: invoice.amount,
        bill_to: invoice.bill_to,
        branch_id: invoice.branch_id,
        broker: invoice.broker,
        brokerage: invoice.brokerage,
        country_of_goods: invoice.country_of_goods,
        currency: invoice.currency,
        customer_id: invoice.customer_id,
        date: this.convertFullDateToDate(invoice.date),
        due_date: this.convertFullDateToDate(invoice.due_date),
        invoice_id: parseInt(this.invoice_id),
        ship: this.convertFullDateToDate(invoice.ship),
        f_o_b: invoice.f_o_b,
        final_dest: invoice.final_dest,
        flight_no: invoice.flight_no,
        p_o_number: invoice.p_o_number,
        port_of_loading: invoice.port_of_loading,
        pre_carriage_by: invoice.pre_carriage_by,
        rap: invoice.rap,
        ship_to: invoice.ship_to,
        status: invoice.status,
        terms: invoice.terms,
        via: invoice.via,
      })
      .subscribe((res) => {
        this.toastr.success(res.message);
        this.reload();
      });
  }

  convertFullDateToDate(date) {
    var d = new Date(date);
    return d.toISOString().split('T')[0];
  }

  onSend(email) {
    this.invoice.email = email;
    this.authService.post('send-invoice', this.invoice).subscribe((res) => {
      this.toastr.success(res.message);
    });
  }

  getBeforeDate(month) {
    var d = new Date();
    d.setMonth(d.getMonth() - month);
    return d.toISOString().split('T')[0];
  }

  calculateValues() {
    this.data.filter((el) => {
      if (el.status.match('notdue')) {
        this.calc.unpaid += el.amount;
        this.calc.notdue += el.amount;
      }
      if (el.status.match('overdue')) {
        this.calc.overdue += el.amount;
      }
      if (el.status.match('paid')) {
        this.calc.paid += el.amount;
        this.calc.deposited += el.amount;
      }
    });
  }

  setZeroOnValue() {
    this.calc.unpaid = 0;
    this.calc.notdue = 0;
    this.calc.overdue = 0;
    this.calc.notdeposited = 0;
    this.calc.paid = 0;
    this.calc.deposited = 0;
  }

  onClick(id) {
    this.selectedInvoice = this.data.find((el) => el.id == id);
  }

  onDelete(id) {
    this.authService.delete(`invoice/${id}`).subscribe((res) => {
      this.toastr.success(res.message);
      this.reload();
    });
  }

  onBatchDelete() {
    let id = this.selectedData
      .map(function (val) {
        return val.id;
      })
      .join(',');
    this.authService.delete(`invoice?id=${id}`).subscribe((res) => {
      this.toastr.success(res.message);
      this.reload();
    });
  }

  onCheck(data, event) {
    event.target.checked
      ? this.selectedData.push(this.data.filter((e) => e.id == data.id)[0])
      : (this.selectedData = this.selectedData.filter((e) => e.id !== data.id));
  }

  onPrint() {
    window.print();
  }

  onSendReminder(invoice) {
    this.authService
      .post('reminder-invoice', { invoice: invoice })
      .subscribe((res) => {
        this.toastr.success(res.message);
      });
  }

  ngAfterViewInit() {
    var clicked = false;
    $('.cust-chkmark').on('click', function () {
      $('.checkhour').prop('checked', !clicked);
      this.selectedData = !clicked ? this.data : [];
      clicked = !clicked;
    });
  }
}
